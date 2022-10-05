import React, { useState, useEffect } from 'react';
import Input from './ui/Input';
import SubmitBtn from './ui/SubmitBtn';
import List from './ui/List';

const UsersList = (props) => {
  // States
  const [error, setError] = useState(null);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [customItems, setCustomItems] = useState([]);

  const { setInvitesIsSent, url } = props;
  // States END

  // Получение данных в формате .json
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setDataIsLoaded(true);
          // Добавляем метод isInvited для каждого пользователя
          let users = result.data.map(el => { return { ...el, invited: false } });
          setItems(users);
        },
        (error) => {
          setDataIsLoaded(true);
          setError(error);
        }
      )
  }, [url]);
  // Получение данных в формате .json END

  // Функции
  function getUsersID() {
    return items.map(el => { return el.id });
  }

  function updateInvitedUsers() {
    const allUsers = document.querySelector('.list').querySelectorAll('.user');
    let updatedUsers = items;
    const usersID = getUsersID();

    for (let i = 0; i < allUsers.length; i++) {
      let currID = Number(allUsers[i].dataset.id);
      let isInvited = allUsers[i].classList.contains('user--invited');

      updatedUsers[usersID.indexOf(currID)].invited = (isInvited === true) ? true : false;
    }

    return updatedUsers;
  }

  function returnInvitedUsers() {
    let array = updateInvitedUsers();
    array = array.filter(el => el.invited === true ? el : '');
    return array;
  }

  function sendMessages() {
    const invitedUsers = returnInvitedUsers();
    
    if (invitedUsers.length !== 0) {
      setInvitesIsSent(true);
      console.log("Invited users:", invitedUsers);
    } else {
      alert("Добавьте хотя бы одного пользователя в список приглашённых");
    }
  }

  function toggleUserToInviteList(e) {
    const el = e.target;
    const parent = el.closest('.user');

    el.classList.toggle('user__btn--active');
    parent.classList.toggle('user--invited');
  }
  // Функции END

  return (
    <>
      <Input items={items} setCustomItems={setCustomItems} updateInvitedUsers={updateInvitedUsers} setItems={setItems} />
      <List error={error} dataIsLoaded={dataIsLoaded} items={customItems.length === 0 ? items : customItems} toggleUserToInviteList={toggleUserToInviteList} />
      <SubmitBtn sendMessages={sendMessages} />
    </>
  );
};

export default UsersList;