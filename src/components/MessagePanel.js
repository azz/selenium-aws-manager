import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const MessagePanel = ({ error }) => {
  if (error)
    return (
      <section className="hero is-danger">
        <div className="hero-body">
          <Error message={error} />
        </div>
      </section>
    );
  return null;
};

const Error = ({ message }) => (
  <div className="container">
    <h1 className="title">
      {message.split(':')[0]}
    </h1>
    <h2 className="subtitle">
      {message.split(':')[1]}
    </h2>
  </div>
);

MessagePanel.propTypes = {
  error: PropTypes.string
};

const mapStateToProps = (state, props) => ({
  error: state.error
});

export default connect(mapStateToProps)(MessagePanel);
