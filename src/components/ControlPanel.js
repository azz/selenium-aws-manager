// import './ControlList.css';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as instanceActions from '../actions/instance';
import { getNameFromTags } from '../util';

const ControlPanel = (
  { images, keyPairs, instanceTypes, subnets, actions }
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
      <div className="container">
        <h2>
          Launch New Instance
        </h2>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Machine Image</label>
          </div>
          <div className="field-body">
            <p className="control">
              <span className="select">
                <select ref={element => amiSelect = element}>
                  {images.map(image => (
                    <option key={image.ImageId} value={image.ImageId}>
                      {image.Name} ({image.State})
                    </option>
                  ))}
                </select>
              </span>
            </p>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Instance Type</label>
          </div>
          <div className="field-body">
            <p className="control">
              <span className="select">
                <select ref={element => instanceTypeSelect = element}>
                  {instanceTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </span>
            </p>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Key Pair</label>
          </div>
          <div className="field-body">
            <p className="control">
              <span className="select">
                <select ref={element => keyPairSelect = element}>
                  {keyPairs.map(keyPair => (
                    <option
                      key={keyPair.KeyFingerprint}
                      value={keyPair.KeyName}
                    >
                      {keyPair.KeyName}
                    </option>
                  ))}
                </select>
              </span>
            </p>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Subnet</label>
          </div>
          <div className="field-body">
            <p className="control">
              <span className="select">
                <select ref={element => subnetSelect = element}>
                  {subnets.map(subnet => (
                    <option key={subnet.SubnetId} value={subnet.SubnetId}>
                      {subnet.Name} ({subnet.CidrBlock})
                    </option>
                  ))}
                </select>
              </span>
            </p>
          </div>
        </div>

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
    </section>
  );
};

ControlPanel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  instanceTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  keyPairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  subnets: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.object.isRequired
};

const addNameToSubnet = subnets => {
  return subnets
    .map(subnet => ({
      ...subnet,
      Name: getNameFromTags(subnet.Tags)
    }))
    .sort((a, b) => a.Name < b.Name);
};

const mapStateToProps = (state, props) => ({
  images: state.images,
  instanceTypes: state.instanceTypes,
  keyPairs: state.keyPairs,
  subnets: addNameToSubnet(state.subnets)
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(instanceActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
