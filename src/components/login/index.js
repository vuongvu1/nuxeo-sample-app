import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from 'actions/nuxeo';

class Login extends React.Component {
  render() {
    const { nuxeo, authenticate } = this.props;
    return (
      <>
        {
          nuxeo
          ? (
            <div>Login as <strong>{nuxeo._auth.username}</strong></div>
          )
          : (<button onClick={() => authenticate()}>Login</button>)
        }
      </>
    );
  }
};

const mapStateToProps = state => ({
  nuxeo: state.nuxeo.authentication,
});

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authenticate()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
