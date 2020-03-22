import React from 'react';
import './App.css';

import Home from './pages/Home';
import Error from './pages/Error';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';

function App() {
  return (
    <div>
      <Home />
      <Error />
      <Rooms />
      <SingleRoom />
    </div>
  );
}

export default App;
