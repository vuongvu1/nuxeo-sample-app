import React from 'react';
import { connect } from 'react-redux';
import { createFolder } from 'apis/nuxeo';

class Operation extends React.Component {
  state = {
    folderName: 'test',
    isSuccess: null,
  }

  onChangeName = (folderName) => {
    this.setState({ folderName });
  }

  handleCreateFolder = async ({ nuxeo }) => {
    const { folderName } = this.state;
    await createFolder({ nuxeo, folderPath: '/default-domain/workspaces/', folderName });
    this.setState({ isSuccess: true });
  }

  render() {
    const { nuxeo } = this.props;
    const { folderName, isSuccess }  = this.state;

    if (!nuxeo) {
      return (<div>Please login to continue!</div>);
    }
    return (
      <>
        <strong>Operation:</strong>
        <br />
        <br />
        Folder path: <input type="text" value="/default-domain/workspaces/" disabled/>
        <br />
        Folder name: <input type="text" value={folderName} onChange={(e) => this.onChangeName(e.target.value)}/>
        <br />
        <button onClick={() => this.handleCreateFolder({ nuxeo })}>Create folder</button>
        <hr />
        {
          isSuccess && (<strong style={{ color: 'green' }}>Success!</strong>)
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
)(Operation)
