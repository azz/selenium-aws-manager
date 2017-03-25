import './App.css';

import React from 'react';

import ContainerList from './ContainerList';
import KeyEntry from './KeyEntry';

const App = _ => (
  <div className="App">
    <div className="App-header">
      <h2>Selenium AWS Manager</h2>
      <KeyEntry />
    </div>
    <ContainerList />
  </div>
);

export default App;
