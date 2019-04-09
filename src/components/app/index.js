import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Upload from '../upload';
import Directory from '../dir';
import Login from '../login';
import User from '../user';
import Operation from '../op';
import './index.scss';

const App = () => (
  <div>
    <header>
      <NavLink activeClassName="active" exact={true} to="/">User</NavLink>
      <NavLink activeClassName="active" exact={true} to="/upload">Upload</NavLink>
      <NavLink activeClassName="active" exact={true} to="/dir">Directory</NavLink>
      <NavLink activeClassName="active" exact={true} to="/op">Operation</NavLink>
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
