import React from 'react';

const SubmitBtn = (props) => {
  const { sendMessages } = props;
  return (
    <button className="window__btn btn" onClick={sendMessages}>Отправить приглашение</button>
  );
};

export default SubmitBtn;