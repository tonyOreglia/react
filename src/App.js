import React, { Component } from 'react';
import chessboard from './chessboard.png'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={chessboard} alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
