import React from 'react';
import { Route, Link } from 'react-router-dom';
import Upload from '../upload';
import Directory from '../dir';
import Login from '../login';
import User from '../user';
import Operation from '../op';
import './index.scss';

const App = () => (
  <div>
    <header>
      <Link to="/">User</Link>
      <Link to="/upload">Upload</Link>
      <Link to="/dir">Directory</Link>
      <Link to="/op">Operation</Link>
      <Login />
    </header>

    <main>
      <Route exact path="/" component={User} />
      <Route exact path="/dir" component={Directory} />
      <Route exact path="/upload" component={Upload} />
      <Route exact path="/op" component={Operation} />
    </main>
  </div>
)

export default App;
