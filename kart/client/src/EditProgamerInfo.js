import React, { useRef } from 'react';
import styles from './EditProgamerInfo.module.scss';
import HomeButton from './HomeButton';
import { Link } from 'react-router-dom';


function EditProgamerInfo(props) {
  const nicknameInputRef = useRef();
  const teamInputRef = useRef();
  const positionInputRef = useRef();
  const onClickInfo = () => {
    const data = {
      nickname: nicknameInputRef.current.value,
      team: teamInputRef.current.value,
      position: positionInputRef.current.value
    };
    fetch(`/api/progamer/${props.match.params.name}`, {
      method: 'PUT',
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
      props.history.push(`/progamer/${props.match.params.name}`);
    })
  }
  return (
    <div>
      <h1 className={styles.title}>정보 수정</h1>
      <input className={styles.text} ref={nicknameInputRef} type="text" placeholder="별명"/>
      <input className={styles.text} ref={teamInputRef} type="text" placeholder="소속팀"/>
      <input className={styles.text} ref={positionInputRef} type="text" placeholder="포지션"/>
      <Link to='/progamer'>
        <button className={styles.actionButton} onClick={onClickInfo}>수정 완료</button>
      </Link>
      <HomeButton/>
    </div>
  ) 
}

export default EditProgamerInfo;