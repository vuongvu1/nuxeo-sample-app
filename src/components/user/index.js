import React from 'react';
import { connect } from 'react-redux';
import { getUserInfo, getServerInfo } from 'apis/nuxeo';

class Directory extends React.Component {
  state = {
    userInfo: null,
    serverInfo: null,
  }

  getNuxeoUserInfo = async ({ nuxeo }) => {
    const userInfo = await getUserInfo({ nuxeo });
    this.setState({ userInfo });
  }

  getNuxeoServerInfo = async ({ nuxeo }) => {
    const serverInfo = await getServerInfo({ nuxeo });
    this.setState({ serverInfo });
  }

  render() {
    const { nuxeo } = this.props;
    const { userInfo, serverInfo } = this.state;
    if (!nuxeo) {
      return (<div>Please login to continue!</div>);
    }
    return (
      <>
        <div>Current User</div>
        <button onClick={() => this.getNuxeoUserInfo({ nuxeo })}>Get user info</button>
        <button onClick={() => this.getNuxeoServerInfo({ nuxeo })}>Get server info</button>
        <hr />
        {
          userInfo && (
            <>
              <strong>User info: </strong>
              <div>{JSON.stringify(userInfo.contextParameters.userprofile)}</div>
              <div>{JSON.stringify(userInfo.properties)}</div>
            </>
          )
        }
        <hr />
        {
          serverInfo && (
            <>
              <strong>Server info: </strong>
              <div>{JSON.stringify(serverInfo)}</div>
            </>
          )
        }
      </>
    );
  }
};

const mapStateToProps = state => ({
  nuxeo: state.nuxeo.authentication,
});

export default connect(
  mapStateToProps,
  null
)(Directory)
