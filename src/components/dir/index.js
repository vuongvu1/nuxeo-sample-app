import React from 'react';
import { connect } from 'react-redux';
import { getDir } from 'apis/nuxeo';

class Directory extends React.Component {
  render() {
    const { nuxeo } = this.props;
    if (!nuxeo) {
      return (<div>Please login to continue!</div>);
    }
    return (
      <>
        <div>Directory</div>
        <button onClick={() => getDir({ nuxeo })}>Get dir</button>
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
