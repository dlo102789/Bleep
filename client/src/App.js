import React, { Component } from 'react';
import './App.css';
import Chat from './components/chat/Chat.js'


class App extends Component {
  
  
  render() {
    return (
      <div className="container">
        <div className="
        Chat-container
        row 
        justify-content-md-center
        justify-content-lg-center">
          <div className="
          ChatHeader
          col-md-10
          col-lg-10
          col-sm-12">
            <h2>Simple Chat App</h2>
            <p>Type in your name and enter a message!</p>
          </div>
          <Chat />
        </div>
      </div>
    );
  }
}

export default App;
