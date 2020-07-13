import React, { useRef } from 'react';
import styles from './SigninOnly.module.scss';
import HomeButton from './HomeButton';


function SigninOnly(props) {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const onClickId = () => {
    const data = {
      name: nameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value
    };
    if(!data.name || !data.email || !data.password) {
      alert("모든 값을 입력해주세요.");
      return;
    }
    fetch('/api/user/signin', {
      method: 'POST',
      credentials: 'same-origin',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(result => {
      console.log(result.ok);
      return result.json();
    }).then(json => {
      console.log('data:', json);
      props.history.push('/login');
    });
  }
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>회원 가입</h1>
      <input className={styles.inputField} ref={nameInputRef} type="text" placeholder="이름"/>
      <input className={styles.inputField} ref={emailInputRef} type="text" placeholder="이메일"/>
      <input className={styles.inputField} ref={passwordInputRef} type="password" placeholder="비밀번호"/>
      
        <button className={styles.actionButton} onClick={onClickId}>회원가입</button>
      
      
      <HomeButton/>
    </div>
  ) 
}

export default SigninOnly;