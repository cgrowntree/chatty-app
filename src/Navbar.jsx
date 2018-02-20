import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    console.log('Rendering <Navbar/>');
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty App</a>
      </nav>
    );
  }
}

export default Navbar;