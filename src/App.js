import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MainContainer from './pages/MainContainer';
import Screen from './pages/Screen';

function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
        <h1 className="bb5">Keyboard Shortcut Library</h1>
        <Switch>
          <Route exact path='/' render={(props) => (<MainContainer {...props} />)} />
          <Route exact path='/screen/:id' render={(props) => (<Screen {...props} />)} />
        </Switch>
      </HashRouter>
    </div >
  );
}

export default App;
