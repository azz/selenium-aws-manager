// import './ControlList.css';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as imageActions from '../actions/image';

const ControlPanel = ({ images, keyPairs, instanceTypes, actions }) => {
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
                <select>
                  {images.map(image => (
                    <option key={image.ImageId}>
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
                <select>
                  {instanceTypes.map(type => (
                    <option key={type}>
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
                <select>
                  {keyPairs.map(keyPair => (
                    <option key={keyPair.KeyFingerprint}>
                      {keyPair.KeyName}
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
                <button className="button is-primary is-large">Launch</button>
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
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
  images: state.images,
  instanceTypes: state.instanceTypes,
  keyPairs: state.keyPairs
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(imageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
