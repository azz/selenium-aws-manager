import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as errorActions } from '../ducks/error';

const MessagePanel = ({ error, actions }) => {
  const clearError = _ => actions.setError('');
  if (error)
    return (
      <article className="message is-danger">
        <div className="message-header">
          <strong>{error.toString().split(':')[0]}</strong>
          <button onClick={clearError} className="delete" />
        </div>
        <div className="message-body">
          {error.toString().split(':')[1]}
        </div>
      </article>
    );
  return null;
};

MessagePanel.propTypes = {
  error: PropTypes.string
};

const mapStateToProps = (state, props) => ({
  error: state.error
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(errorActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagePanel);
