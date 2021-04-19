import React from 'react';
import './App.css';
import { HomePage } from './containers/Homepage';
import { UserPage } from './containers/UserPage';
import {Route,BrowserRouter as Router,Switch} from "react-router-dom"

function App() {
  return (
 <Router>
 <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/user/:userId" component={UserPage}/> 
        <Route>404 NOT FOUND!</Route>
      </Switch>
      </div>
      </Router>
  );
}

export default App;
