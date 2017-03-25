import './KeyEntry.css';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as credentialActions from '../actions/credential';

const KeyEntry = ({ credentials, actions }) => {
  const { accessKeyId, secretAccessKey } = credentials;
  let keyIdInput, secretKeyInput;
  const submit = _ =>
    actions.setCredentials(
      keyIdInput.value.trim(),
      secretKeyInput.value.trim()
    );
  const clear = _ => actions.setCredentials('', '');

  if (!accessKeyId || !secretAccessKey) {
    return (
      <form onSubmit={submit}>
        <input
          ref={input => keyIdInput = input}
          className="KeyEntry-access"
          type="text"
          value={accessKeyId}
          placeholder="Access Key ID"
          onInput={submit}
        />
        <input
          ref={input => secretKeyInput = input}
          className="KeyEntry-secret"
          type="text"
          value={secretAccessKey}
          placeholder="Secret Access Key"
          onInput={submit}
        />
      </form>
    );
  }

  return <button onClick={clear}>Clear Keys</button>;
};

KeyEntry.propTypes = {
  credentials: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
  credentials: state.credentials
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(credentialActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(KeyEntry);
