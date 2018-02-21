import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      currentUser: ''
    };
  }

  onMessageTextChange(event) {
    this.setState({messageText: event.target.value});
  }

  onCurrentUserChange(event) {
    this.setState({currentUser: event.target.value});
  }

  onMessageKeyPress(event) {
    if (event.key === 'Enter') {
      const currentUser = (this.state.currentUser.length <= 0 ? 'Anonymous' : this.state.currentUser);
      // they pressed enter!
      this.props.newMessage(this.state.messageText, currentUser);
      this.setState({messageText: ''});
    }
  }

  render() {
    console.log('Rendering <Chatbar/>');
    return (
      <footer className="chatbar">
        <input 
          value={this.state.currentUser}
          onChange={this.onCurrentUserChange.bind(this)}
          className="chatbar-username" 
          placeholder="Your Name (Optional)"/>
        <input
          value={this.state.messageText}
          onChange={this.onMessageTextChange.bind(this)}
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.onMessageKeyPress.bind(this)} />
      </footer>
    );
  }
}

export default Chatbar;