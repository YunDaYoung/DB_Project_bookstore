import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { default as Auth } from './layout/Auth'

function App() {
  return (
    <div>
      <Router>
        <Route path='/' exact render={props => (<Auth />)}></Route>
      </Router>
    </div>
  );
}

export default App;
