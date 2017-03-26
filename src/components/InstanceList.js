import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Instance from './Instance';
import * as instanceActions from '../actions/instance';

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
        <ul className="tile is-ancestor">
          {instances.map(instance => (
            <Instance key={instance.InstanceId} {...instance} />
          ))}
        </ul>
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
