import { isNumber } from 'lodash';

export const types = {
  SET_BROWSER: 'SET_BROWSER',
  SET_MAX_INSTANCES: 'SET_MAX_INSTANCES',
  SET_HUB_HOST: 'SET_HUB_HOST',
  SET_HUB_PORT: 'SET_HUB_PORT'
};

const browsers = [
  { displayName: 'Google Chrome', seleniumName: 'chrome' },
  { displayName: 'Mozilla Firefox', seleniumName: 'firefox' }
];

const initialState = {
  maxInstances: 5,
  selectedBrowserSeleniumName: browsers[0].seleniumName,
  browsers,
  hub: {
    host: '0.0.0.0',
    port: 80
  }
};

export default (
  state = initialState,
  { type, maxInstances, seleniumName, host, port }
) => {
  switch (type) {
    case types.SET_MAX_INSTANCES:
      if (!isNumber(maxInstances))
        throw new Error('maxInstances should be a number');
      return {
        ...state,
        maxInstances
      };
    case types.SET_BROWSER:
      return {
        ...state,
        selectedBrowserSeleniumName: seleniumName
      };
    case types.SET_HUB_HOST:
      return {
        ...state,
        hub: { ...state.hub, host }
      };
    case types.SET_HUB_PORT:
      return {
        ...state,
        hub: { ...state.hub, port }
      };
    default:
      return state;
  }
};

export const actions = {
  setBrowser: seleniumName => ({ type: types.SET_BROWSER, seleniumName }),
  setMaxInstances: maxInstances => ({
    type: types.SET_MAX_INSTANCES,
    maxInstances
  }),
  setHubHost: host => ({ type: types.SET_HUB_HOST, host }),
  setHubPort: port => ({ type: types.SET_HUB_PORT, port })
};

export const selectors = {
  getSelectedBrowser(state) {
    return state.browsers.find(
      browser => browser.seleniumName === state.selectedBrowserSeleniumName
    );
  },
  getSelectedBrowserName(state) {
    return state.selectedBrowserSeleniumName;
  },
  getMaxInstances(state) {
    return state.maxInstances;
  },
  getSeleniumOptions(state) {
    const browser = `-browserName=${state.selectedBrowserSeleniumName},maxInstances=${state.maxInstances}`;
    return [`-maxSession=${state.maxInstances}`, `-browser ${browser}`].join(
      ' '
    );
  },
  getDockerRunCommand(state) {
    const selOpts = selectors.getSeleniumOptions(state);
    return [
      `docker run`,
      `-e HUB_4444_TCP_ADDR=${state.hub.host}`,
      `-e HUB_4444_TPC_PORT=${state.hub.port}`,
      `-e SE_OPTS="${selOpts}"`,
      '--network icc',
      '--name selenium-node',
      'selenium/node-chrome:latest'
    ].join(' \\\n  ');
  }
};
