import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from 'actions/nuxeo';

const Home = props => (
  <div>
    <h1>Home</h1>
    <p>Welcome home!</p>
    <button onClick={() => props.authenticate()}>Authen</button>
  </div>
)

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authenticate()),
});

export default connect(
  null,
  mapDispatchToProps
)(Home)
