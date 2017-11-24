import React, { Component } from 'react';
import Header from './Header';
import io from 'socket.io-client';

const socket = io();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }
  componentDidMount() {
      socket.on('connect', () => {
        console.log('Connected to server');
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      socket.on('welcomeMessage', (data) => {
        this.setState({
          users: [data]
        });
      });
  }

  render() {
    const users = this.state.users.map(user => (
      <li key={user.id}>{user.name}</li>
    ))
    return (
      <div>
        <Header title="First Application with webpack + ReactJS" />
        <p>First Commit</p>
        <ul>{users}</ul>
      </div>
    )
  }
}

export default App;
