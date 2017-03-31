// import './ControlList.css';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as instanceActions } from '../ducks/instances';
import { selectors as subnetSelectors } from '../ducks/subnets';
import {
  actions as seleniumActions,
  selectors as seleniumSelectors
} from '../ducks/selenium';

import { DisabledLoadingOption, Field } from './Forms';

const ControlPanel = (
  {
    images,
    keyPairs,
    instanceTypes,
    subnets,
    browsers,
    selectedBrowser,
    maxInstances,
    hub,
    dockerRunCommand,
    actions
  }
) => {
  let amiSelect, instanceTypeSelect, keyPairSelect, subnetSelect;
  const launchInstance = _ => {
    actions.launchInstance({
      imageId: amiSelect.value,
      instanceType: instanceTypeSelect.value,
      keyPair: keyPairSelect.value,
      subnet: subnetSelect.value
    });
  };

  return (
    <section className="section">
      <h2>
        Launch New Instance
      </h2>

      <div className="columns">
        <div className="column is-6">
          <div className="container">
            <Field label="Machine Image">
              <span className="select">
                <select ref={element => amiSelect = element} defaultValue="">
                  {images.length
                    ? images.map(image => (
                        <option key={image.ImageId} value={image.ImageId}>
                          {image.Name} ({image.State})
                        </option>
                      ))
                    : <DisabledLoadingOption />}
                </select>
              </span>
            </Field>

            <Field label="Instance Type">
              <span className="select">
                <select ref={element => instanceTypeSelect = element}>
                  {instanceTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </span>
            </Field>

            <Field label="Key Pair">
              <span className="select">
                <select
                  ref={element => keyPairSelect = element}
                  defaultValue=""
                >
                  {keyPairs.length
                    ? keyPairs.map(keyPair => (
                        <option
                          key={keyPair.KeyFingerprint}
                          value={keyPair.KeyName}
                        >
                          {keyPair.KeyName}
                        </option>
                      ))
                    : <DisabledLoadingOption />}
                </select>
              </span>
            </Field>

            <Field label="Subnet">
              <span className="select">
                <select ref={element => subnetSelect = element} defaultValue="">
                  {subnets.length
                    ? subnets.map(subnet => (
                        <option key={subnet.SubnetId} value={subnet.SubnetId}>
                          {subnet.Name} ({subnet.CidrBlock})
                        </option>
                      ))
                    : <DisabledLoadingOption />}
                </select>
              </span>
            </Field>

            <Field label="Browser">
              <span className="select">
                <select
                  ref={element => subnetSelect = element}
                  value={selectedBrowser}
                  onChange={evt => actions.setBrowser(evt.target.value)}
                >
                  {browsers.map(({ seleniumName, displayName }) => (
                    <option key={seleniumName} value={seleniumName}>
                      {displayName}
                    </option>
                  ))}
                </select>
              </span>
            </Field>

            <Field label="Max Browser Instances">
              <input
                className="input"
                type="number"
                value={maxInstances}
                onChange={evt => actions.setMaxInstances(+evt.target.value)}
              />
            </Field>

            <Field label="Hub IP Address">
              <input
                className="input"
                type="text"
                value={hub.host}
                onChange={evt => actions.setHubHost(evt.target.value)}
              />
            </Field>

            <Field label="Hub Port">
              <input
                className="input"
                type="number"
                value={hub.port}
                onChange={evt => actions.setHubPort(+evt.target.value)}
              />
            </Field>

            <div className="field is-horizontal">
              <div className="field-label" />
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <button
                      className="button is-primary is-large"
                      onClick={launchInstance}
                    >
                      Launch
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-6">
          <div className="container">
            <h3>Preview</h3>
            <pre>{dockerRunCommand}</pre>
          </div>
        </div>
      </div>
    </section>
  );
};

ControlPanel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  instanceTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  keyPairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  subnets: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedBrowser: PropTypes.string.isRequired,
  dockerRunCommand: PropTypes.string.isRequired,
  maxInstances: PropTypes.number.isRequired,
  hub: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
  images: state.images,
  instanceTypes: state.instanceTypes,
  keyPairs: state.keyPairs,
  browsers: state.selenium.browsers,
  selectedBrowser: seleniumSelectors.getSelectedBrowserName(state.selenium),
  maxInstances: seleniumSelectors.getMaxInstances(state.selenium),
  dockerRunCommand: seleniumSelectors.getDockerRunCommand(state.selenium),
  hub: state.selenium.hub,
  subnets: subnetSelectors.getSubnetsWithName(state.subnets)
});
const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(instanceActions, dispatch),
    ...bindActionCreators(seleniumActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
