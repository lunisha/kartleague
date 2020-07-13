import React, { useRef } from 'react';
import styles from './LoginSignin.module.scss';

function LogoutButton(props) {

  const onClickId = () => {
    fetch('/api/user/logout', {
      method: 'GET',
      credentials: 'same-origin'
    }).then(result => {
      console.log(result.ok);
      return result.json();
    }).then(json => {
      console.log('data:', json);
    })
  }

  return (
    <div className={styles.root}>
      <button className={styles.actionButton} onClick={onClickId}>로그아웃</button>           
    </div>
  )
}

export default LogoutButton;