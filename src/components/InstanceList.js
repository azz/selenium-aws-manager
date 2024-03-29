import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Instance from './Instance';
import { actions as instanceActions } from '../ducks/instances';

const InstanceList = ({ instances, error, actions }) => {
  return (
    <section className="section">
      <div className="container">
        <h2>
          Current Instances
          <button className="button is-link" onClick={actions.fetchInstances}>
            Reload
          </button>
        </h2>
        <div className="columns" style={{ flexFlow: 'row wrap' }}>
          {instances.map(instance => (
            <Instance key={instance.InstanceId} {...instance} />
          ))}
        </div>
      </div>
    </section>
  );
};

InstanceList.propTypes = {
  instances: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
  instances: state.instances,
  error: state.error
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(instanceActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(InstanceList);
