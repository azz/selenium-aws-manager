import React, { PropTypes } from 'react';

const name = tags => {
  const tag = tags.find(tag => tag.Key === 'Name');
  return tag ? tag.Value : '<No Name>';
};

const uptime = launchTime => {
  return Math.round((Date.now() - launchTime.getTime()) / (1000 * 60 * 60));
};

const Instance = (
  {
    State,
    PrivateIpAddress,
    InstanceType,
    Tags,
    KeyName,
    LaunchTime,
    Platform
  }
) => (
  <div className="column is-4">
    <div className="box">
      <h2>
        {name(Tags) + ' '}
        <span
          className={
            `tag ${State.Name === 'running' ? 'is-success' : 'is-danger'}`
          }
        >
          {State.Name}
        </span>
      </h2>
      <div>
        <strong>IP Address</strong>: <code>{PrivateIpAddress}</code>
      </div>
      <div>
        <strong>Key Pair</strong>: {KeyName}
      </div>
      {Platform &&
        <div>
          <strong>Platform</strong>: {Platform}
        </div>}
      <div>
        <strong>Instance Type</strong>: {InstanceType}
      </div>
      <div>
        <strong>Up Time</strong>: {uptime(LaunchTime)} hours
      </div>
    </div>
  </div>
);

Instance.propTypes = {
  State: PropTypes.object.isRequired,
  PrivateIpAddress: PropTypes.string.isRequired,
  InstanceType: PropTypes.string.isRequired,
  KeyName: PropTypes.string.isRequired,
  Platform: PropTypes.string,
  Tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  LaunchTime: PropTypes.object.isRequired
};

export default Instance;
