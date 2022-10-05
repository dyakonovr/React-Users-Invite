
import Success from './components/Success';
import UsersList from './components/UsersList';
import { CSSTransition } from 'react-transition-group';
import { useState } from 'react';
import './index.scss';

function App() {
  const url = "https://reqres.in/api/users";

  const [invitesIsSent, setInvitesIsSent] = useState(false);

  return (
    <div className="app">
      <div className="window">
        {!invitesIsSent && <UsersList url={url} setInvitesIsSent={setInvitesIsSent} />}
        <CSSTransition in={invitesIsSent} classNames='alert' timeout={500} unmountOnExit>
          <Success setInvitesIsSent={setInvitesIsSent} />
        </CSSTransition>
      </div>
    </div>
  );
}

export default App;
