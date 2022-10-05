import React from 'react';
import Fuse from 'fuse.js';

const Input = (props) => {
  const { setCustomItems, updateInvitedUsers, setItems, items } = props;

  const fuse = new Fuse(items, {
    keys: ["email", "first_name", "last_name"]
  });

  function search(e) {
    let newItems = updateInvitedUsers();
    setItems(newItems);
    const value = e.target.value;
    const matches = fuse.search(value).map(el => { 
      return el.item;
     });
    setCustomItems(matches);
  }

  return (
    <div className="window__wrapper">
      <input type="text" placeholder='Найти пользователя...' className='window__input' onChange={(e) => search(e)} />
      <span className='window__magnifier'></span>
    </div>
  );
};

export default Input;