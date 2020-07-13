import React, { useRef } from 'react';
import styles from './LoginOnly.module.scss';
import { Link } from "react-router-dom";
import HomeButton from './HomeButton';

function LoginOnly(props) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const onClickId = () => {
    const data = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value
    };
    fetch('/api/user/login', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(result => {
      console.log(result.ok);
      return result.json();
    }).then(json => {
      console.log('data:', json);
    })
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>정보열람을 원하시면 로그인하세요.</h1>
      <input className={styles.inputField} ref={emailInputRef}type="text" placeholder="이메일"/>
      <input className={styles.inputField} ref={passwordInputRef} type="password" placeholder="비밀번호"/>
      <Link to="/">
        <button className={styles.actionButton} onClick={onClickId}>로그인</button>
      </Link>
      <Link to="/signin">
        <button className={styles.actionButton} type="button">회원가입</button>
      </Link>
      <HomeButton/>      
    </div>
  )
}

export default LoginOnly;