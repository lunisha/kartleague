import React, { useState, useEffect } from 'react';
import styles from './ProgamerDetail.module.scss';
import HomeButton from './HomeButton';
import { Link } from 'react-router-dom';


function ProgamerDetail(props){
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/progamer/${props.match.params.name}`, {
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

  if(data === null)
    return null;
  
  let text = [];
  let nickname = "";
  for(let i = 0; i<data.nickname.length; i++){
    if(i + 1 === data.nickname.length){
      nickname += data.nickname[i]
      
    }
    else{
      nickname += data.nickname[i] + ", "
    }
  }
  text.push(
    <table id={0}>
      <tbody>
      <tr>
        <th>별명</th>
        <td>{nickname}</td>
      </tr>
      <tr>
        <th>소속 팀</th>
        <td>{data.team}</td>
      </tr>
      <tr>
        <th>포지션</th>
        <td>{data.position}</td>
      </tr>
      </tbody>
    </table>
  )

  let youtube = [];
  let twitch = [];
  let afreeca = [];
  if(data.link[0] !== "")
    youtube.push(
      <a className={styles.link} href={data.link[0]}> | 유튜브 |</a>
    )  
  if(data.link[1] !== "")
    twitch.push(
      <a className={styles.link} href={data.link[1]}>   | 트위치 |  </a>
    )
  if(data.link[2] !== "")
    afreeca.push(
      <a className={styles.link} href={data.link[2]}>  | 아프리카TV |</a>
    )
  
  let url = `/progamer/${data.name}/edit`;
  return (
    <div>
      <div className={styles.text}>
        <h1 className={styles.name}>{data.name}</h1>
        <div className={styles.table}>{text}</div>
        <div className={styles.span}>{youtube}{twitch}{afreeca}</div>
      </div>
      <Link to={url}>
          <button className={styles.actionButton} type="button">수정</button>
      </Link>
      <HomeButton/>
    </div>
    
  )
}
export default ProgamerDetail;