import React, { useRef, useContext } from 'react';
import styles from './LoginSignin.module.scss';
import { Link } from "react-router-dom";
import AuthContext from './AuthContext'

function LoginSignin(props) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const onClickId = () => {
    
    const data = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value
    };
    if(!data.email || !data.password) {
      alert("모든 값을 입력해주세요.");
      return;
    }
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
      <input className={styles.inputField} ref={emailInputRef}type="text" placeholder="이메일"/>
      <input className={styles.inputField} ref={passwordInputRef} type="password" placeholder="비밀번호"/>
      <Link to ="/">
        <button className={styles.actionButton} onClick={onClickId}>로그인</button>
      </Link>
      <Link to="/signin">
        <button className={styles.actionButton} type="button">회원가입</button>
      </Link>      
    </div>
  )
}

export default LoginSignin;