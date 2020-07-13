import React, {useContext} from 'react';
import styles from './Main.module.scss';
import { Link } from "react-router-dom";
import LoginSignin from './LoginSignin';
import AuthContext from './AuthContext';
import LogoutButton from './LogoutButton';


function Main(){
  const auth = useContext(AuthContext);
  if(!auth.status){
  return (
    <div>
      <LoginSignin/>
      <h1 className={styles.title}>카트라이더 리그에 대한 모든 것</h1>
      <h5 className={styles.notice}>로그인 후, 새로고침 바랍니다.</h5>
      <div className={styles.actions}>
        <Link className={styles.actionButton} to="/league">
          <button type="button">리그 목록</button>
        </Link>
        <Link className={styles.actionButton} to="/progamer">
          <button type="button">선수 목록</button>
        </Link>
      </div>
    </div>
  )
  }
  else{
    return (
      <div>
        <LogoutButton/>
        <h1 className={styles.title}>카트라이더 리그에 대한 모든 것</h1>
        <h4 className={styles.notice}>로그아웃 후, 새로고침 바랍니다.</h4>
        <div className={styles.actions}>
          <Link className={styles.actionButton} to="/league">
            <button type="button">리그 목록</button>
          </Link>
          <Link className={styles.actionButton} to="/progamer">
            <button type="button">선수 목록</button>
          </Link>
        </div>
      </div>
    )
  }
}
export default Main;