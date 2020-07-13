import React, { useState, useEffect } from 'react';
import LoginOnly from './LoginOnly';
import Main from './Main';
import LeagueList from './LeagueList';
import ProgamerList from './ProgamerList';
import SigninOnly from './SigninOnly';
import LeagueDetail from './LeagueDetail';
import ProgamerDetail from './ProgamerDetail';
import { Route } from 'react-router-dom';
import EditProgamerInfo from './EditProgamerInfo';
import AuthContext from './AuthContext';


function App(props) {
  const [status, setStatus] = useState(null);

  const refresh = () => {
      fetch('/api/user/check', {
        method: 'GET',
        credentials: 'same-origin'
      }).then((result) => {
          if(result.ok)
              setStatus(true);
          else
              setStatus(false);
      }).catch((err) => {
          alert('네트워크 오류가 발생했습니다. 페이지를 새로고침 해 주세요.');
      });
  }

  useEffect(() => {
      refresh();
  }, []);

  if(status === null)
      return null;
  console.log(refresh);
  return (
    <React.Fragment>
      <AuthContext.Provider value={{status, refresh}}>
        {props.children}
        <Route exact path="/" component={Main}/>
        <Route exact path="/login" component={LoginOnly}/>
        <Route exact path="/league" component={LeagueList}/>
        <Route exact path="/league/:season" component={LeagueDetail}/>
        <Route exact path="/progamer/:name" component={ProgamerDetail}/>
        <Route exact path="/progamer/:name/edit" component={EditProgamerInfo}/>
        <Route exact path="/progamer" component={ProgamerList}/>
        <Route exact path="/signin" component={SigninOnly}/>
        </AuthContext.Provider>
    </React.Fragment>
  )
}

export default App;