import React from 'react';
import { connect } from 'react-redux';
import { retrieveDocument } from 'apis/nuxeo';

class Directory extends React.Component {
  handleOnClick = async ({ nuxeo }) => {
    const doc = await retrieveDocument({ nuxeo });
    const workflow = await doc.startWorkflow('SerialDocumentReview');
    console.log({ workflow });

    const task = (await workflow.fetchTasks()).entries[0];
    task
      .variable('participants', ['user:Administrator'])
      .variable('assignees', ['user:Administrator'])
      .variable('end_date', '2011-10-23T12:00:00.00Z');
    const result = await task.complete('start_review', { comment: 'a comment' });

    console.log({ task, result });
  };

  render() {
    const { nuxeo } = this.props;
    if (!nuxeo) {
      return (<div>Please login to continue!</div>);
    }
    return (
      <>
        <div>Workflow</div>
        <button onClick={() => this.handleOnClick({ nuxeo })}>Complete test doc</button>
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
