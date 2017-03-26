import React from 'react';

import InstanceList from './InstanceList';
import KeyEntry from './KeyEntry';
import ControlPanel from './ControlPanel';
import MessagePanel from './MessagePanel';

const App = _ => (
  <div className="App content">
    <MessagePanel />

    <Header />
    <div className="App-header" />
    <InstanceList />
    <ControlPanel />
  </div>
);

const Header = _ => (
  <nav className="nav has-shadow">
    <div className="nav-left">
      <a className="nav-item">
        Selenium AWS Manager
      </a>
    </div>

    <div className="nav-right nav-menu">
      <span className="nav-item">
        <KeyEntry />

      </span>
    </div>
  </nav>
);

export default App;
