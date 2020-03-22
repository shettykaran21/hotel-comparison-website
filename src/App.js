import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Error from './pages/Error';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';

import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/rooms/">
          <Rooms />
        </Route>
        <Route exact path="/rooms/:slug">
          <SingleRoom />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
