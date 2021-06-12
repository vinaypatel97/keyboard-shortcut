import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainContainer from './pages/MainContainer';
import Screen from './pages/Screen';

function App() {
  return (
    <div className="App">
      <Router>
        <h1 className="bb5">Keyboard Shortcut Library</h1>
        <Switch>
          <Route exact path='/'>
            <MainContainer />
          </Route>
          <Route exact path='/screen/:id' render={(props) => (<Screen{...props} />)} />
          <Screen />
        </Switch>
      </Router>
    </div >
  );
}

export default App;
