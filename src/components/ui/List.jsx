import { Scrollbars } from 'react-custom-scrollbars';
import ContentLoader from "react-content-loader";

const List = (props) => {
  const CustomScrollbars = props => (
    <Scrollbars
      renderTrackVertical={props => <div {...props} className="track-vertical" />}
      renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
      {...props}
    />
  );

  const { dataIsLoaded, error, items, toggleUserToInviteList } = props;
  
  if (error) {
    return <div style={{ color: "black", margin: "20px 0" }}>Ошибка: {error.message}</div>;
  } else {
    let list;
    if (!dataIsLoaded) {
      list = <ContentLoader
        speed={0.8}
        width={340}
        height={160}
        viewBox="0 0 340 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <circle cx="23" cy="23" r="23" />
        <rect x="58" y="5" rx="2" ry="2" width="200" height="15" />
        <rect x="58" y="25" rx="2" ry="2" width="120" height="10" />

        <circle cx="23" cy="79" r="23" />
        <rect x="58" y="61" rx="2" ry="2" width="200" height="15" />
        <rect x="58" y="81" rx="2" ry="2" width="120" height="10" />

        <circle cx="23" cy="135" r="23" />
        <rect x="58" y="117" rx="2" ry="2" width="200" height="15" />
        <rect x="58" y="137" rx="2" ry="2" width="120" height="10" />
      </ContentLoader>
    } else {
      list = items.map(user => {
        return (
          <li className={user.invited === true ? 'window__item user user--invited' : 'window__item user'} key={user.id} data-id={user.id}>
            <div className="user__img">
              <img src={user.avatar} alt="User avatar" />
            </div>
            <div className="user__data">
              <strong className='user__name'>{user.first_name} {user.last_name}</strong>
              <span className='user__email'>{user.email}</span>
            </div>
            <button className={user.invited === true ? "user__btn user__btn--active" : "user__btn"} type='button' onClick={toggleUserToInviteList}></button>
          </li>
        );
      })
    }

    return (
      <ul className="window__list list">
        <CustomScrollbars autoHeight autoHeightMin={250}>
          {list}
        </CustomScrollbars>
      </ul>
    );
  }
};

export default List;