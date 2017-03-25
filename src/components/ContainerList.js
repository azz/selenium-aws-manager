import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Container from './Container';
import * as containerActions from '../actions/container';

import './ContainerList.css';

class ContainerList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { containers, actions } = this.props;
    return (
      <section>
        <h1>
          Containers <button onClick={actions.requestContainers}>Load</button>
        </h1>
        <ul className="ContainerList-parent">
          {containers.map(container => (
            <Container key={container.InstanceId} {...container} />
          ))}
        </ul>
      </section>
    );
  }
}

ContainerList.propTypes = {
  containers: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
    containers: state.containers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(containerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerList);
