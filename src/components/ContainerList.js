import './ContainerList.css';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Container from './Container';
import * as containerActions from '../actions/container';

const ContainerList = ({ containers, error, actions }) => {
  return (
    <section>
      <h1>
        Containers <button onClick={actions.fetchContainers}>Load</button>
      </h1>
      <ul className="ContainerList-parent">
        {error
          ? <Error message={error} />
          : containers.map(container => (
              <Container key={container.InstanceId} {...container} />
            ))}
      </ul>
    </section>
  );
};

const Error = ({ message }) => <div className="Error">{message}</div>;

ContainerList.propTypes = {
  containers: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.string,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
  containers: state.containers,
  error: state.error
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(containerActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerList);
