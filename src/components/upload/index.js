import React from 'react';
import { connect } from 'react-redux';
import { uploadBatch } from 'apis/nuxeo';

class Upload extends React.Component {
  state = {
    selectedFile: null,
  }

  render() {
    const { nuxeo } = this.props;
    const { selectedFile } = this.state;

    if (!nuxeo) {
      return (<div>Please login to continue!</div>);
    }

    return (
      <div>
        <strong>Upload file</strong>
        <br />
        <label htmlFor="avatar">Choose a file:</label>
        <input type="file" onChange={e => this.setState({ selectedFile:  e.target.files[0] })} />
        {
          selectedFile && (
            <button onClick={() => uploadBatch({ nuxeo, file: selectedFile })}>Upload</button>
          )
        }
      </div>
    );
  }
};

const mapStateToProps = state => ({
  nuxeo: state.nuxeo.authentication,
});

export default connect(
  mapStateToProps,
  null
)(Upload)
