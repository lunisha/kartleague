import React, { useState, useEffect } from 'react';
import styles from './LeagueDetail.module.scss';
import HomeButton from './HomeButton';

function LeagueDetail(props){
  const [data, setData] = useState(null);


  useEffect(() => {
    fetch(`/api/league/${props.match.params.season}`, {
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
  
  let arrTeam = [];
  for(let i=0; i<data.pTeam.length; i++) {
    let arrRow = [ <th>{data.pTeam[i][0]}</th> ];
    for(let j = 1; j<data.pTeam[i].length; j++){
      arrRow.push(
        <td>{data.pTeam[i][j]}</td>
      )
    }
    arrTeam.push(<tr>{arrRow}</tr>);
  }
  let arrSingle = [];

  for(let i=0;i<data.pSingle.length; i++){
      arrSingle.push(
        <span className={styles.name}>
          { data.pSingle[i] }
        </span>
      )
  }
  return (
    <div>
      <h1 className={styles.title}>{data.title}</h1>
      <h2 className={styles.first}>우승 :  {data.winnerTeam[0]} / {data.winnerSingle[0]} </h2>
      <h2 className={styles.second}>준우승 :  {data.winnerTeam[1]} / {data.winnerSingle[1]} </h2>
      <h2 className={styles.third}>3위 :  {data.winnerTeam[2]} / {data.winnerSingle[2]} </h2>
      <h3 className={styles.list}> 팀전 참가선수 목록</h3>
      <table className={styles.table}>{arrTeam}</table>
      <h3 className={styles.list}> 개인전 참가선수 목록</h3>
      <div className={styles.table2}>{arrSingle}</div>
      <HomeButton/>
    </div>
    
  )
}
export default LeagueDetail;