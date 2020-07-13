import React from 'react';
import styles from './HomeButton.module.scss';
import { Link } from "react-router-dom";

function HomeButton(){
  return (
    <div>
      <Link to="/">
          <button className={styles.actionButton} type="button">홈</button>
      </Link>
    </div>
  )
}
export default HomeButton;