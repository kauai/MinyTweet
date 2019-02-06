import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import Timeline from './pages/Timeline'


class App extends Component {
  render() {
    return (
     <Router>
       <Switch>
         <Route exact path="/" component={Login}/>
         <Route path="/timeline" component={Timeline}/>
       </Switch>
     </Router>
    );
  }
}

export default App;
