import React from 'react';
import { Route, Link } from 'react-router-dom';
import Upload from '../upload';
import About from '../about';
import Login from '../login';
import './index.scss';

const App = () => (
  <div>
    <header>
      <Link to="/">Upload</Link>
      <Link to="/about-us">About</Link>
      <Login />
    </header>

    <main>
      <Route exact path="/" component={Upload} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
)

export default App;
