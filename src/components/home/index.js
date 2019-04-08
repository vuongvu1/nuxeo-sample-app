import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from 'actions/nuxeo';
import { uploadBatch } from 'apis/nuxeo';

class Home extends React.Component {
  state = {
    selectedFile: null,
  }

  render() {
    const { nuxeo, authenticate } = this.props;
    const { selectedFile } = this.state;
    console.log({ nuxeo, authenticate, selectedFile });

    return (
      <div>
        <h1>Home</h1>
        <p>Welcome home!</p>
        <button onClick={() => authenticate()}>Authen</button>
        <br />
        {
          nuxeo && (
            <>
              <label htmlFor="avatar">Choose a file:</label>
              <input type="file" onChange={e => this.setState({ selectedFile:  e.target.files[0] })} />
            </>
          )
        }
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

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authenticate()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
