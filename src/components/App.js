import React, { Component } from 'react';
import './App.css';

import ContainerList from './ContainerList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Selenium AWS Manager</h2>
        </div>
        <ContainerList />
      </div>
    );
  }
}

export default App;
