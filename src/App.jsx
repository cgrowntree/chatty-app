import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameState: 'Anonymous',
      messages: [],
        // {
        //   id: 1,
        //   type: 'system',
        //   text: 'Chris changed their name to artist formerly known as Chris'
        // }, 
        // {
        //   id: 2,
        //   type: 'user',
        //   text: 'hi',
        //   user: 'artist formerly known as Chris'
        // }
    };
  }

// onload do this...
componentDidMount() {
  console.log('componentDidMount <App />');

  //Connect to webSocket
  this.socket = new WebSocket('ws://localhost:3001/');
  this.socket.onopen = (event) => {
    console.log('connected to ws-server');
    // this.socket.send('newMessages');
  }

  //Display incoming message from server on the client
  this.socket.onmessage = (event) => {
    console.log(event.data);
  
    const newMessages = this.state.messages.concat(JSON.parse(event.data));
    
    this.setState({messages: newMessages});
  };

  setTimeout(() => {
    console.log('Simulating incoming message');
    // Add a new message to the list of messages in the data store
    const newMessageObject = {
      id: 3, 
      type: 'user',
      user: 'Michelle', 
      text: 'Hello there!'
    };
    const newMessages = this.state.messages.concat(newMessageObject)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({
      messages: newMessages
    })
  }, 3000);
}

  newMessage(messageText, currentUser) {
    const newMessageObject = {
      id: null,
      type: 'user',
      user: currentUser,
      text: messageText
    };

    //If the current user changes their name send a message stating the name change
    if (this.state.usernameState !== currentUser) {
      const usernameStateChange = {
        id: null,
        type: 'system',
        text: `${this.state.usernameState} has changed their name to ${currentUser}`
      }
      this.socket.send(JSON.stringify(usernameStateChange));
    }

    //Send new message to the server
    this.socket.send(JSON.stringify(newMessageObject));
    //Set currentUser obj to the username from the most recent message
    this.setState({usernameState: currentUser})
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages} />
        <Chatbar newMessage={this.newMessage.bind(this)} />
      </div>
    );
  }
}

export default App;
