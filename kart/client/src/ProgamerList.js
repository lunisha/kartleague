import React, { useState, useEffect, useContext } from 'react';
import styles from './ProgamerList.module.scss';
import { Link, Redirect } from "react-router-dom";
import HomeButton from './HomeButton';
import AuthContext from './AuthContext';
import LogoutButton from './LogoutButton';

function ProgamerList(){
  const [data, setData] = useState(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch('/api/progamer', {
      method: 'GET',
      credentials: 'same-origin'
    }).then(result => {
      console.log(result);  
      return result.json();
    }).then(json => {
      setData(json);
    }).catch(err => {
      console.error(err);
      alert("네트워크 오류");
    });
  }, []);

  if(!auth.status){
    alert("정보열람을 원하시면 로그인하세요");
    return <Redirect to="/login"/>;
  }
  if(data === null)
    return null;

  let arr = [];
  for(let i=0; i<data.length; i++) {
    arr.push(
      <Link key={i} className={styles.link} to={ `/progamer/${data[i].name}` }>
        { data[i].name }
      </Link>
    )
  }
  
  return (
    <div>
      <LogoutButton/>
        <h1 className={styles.title}>선수목록</h1>
        {arr}
      <HomeButton/>
    </div>      
  )
}
export default ProgamerList;