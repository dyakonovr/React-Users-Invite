import React from 'react';

const Success = (props) => {
  const { setInvitesIsSent } = props;
  function backToList() {
    setInvitesIsSent(false);
  }

  return (
    <div className='popup'>
      <div className='popup__img'></div>
      <strong className='popup__title'>Успешно!</strong>
      <p className='popup__text'>Всем пользователям отправлено приглашение.</p>
      <button className='popup__btn btn' type='button' onClick={backToList}>Назад</button>
    </div>
  );
};

export default Success;