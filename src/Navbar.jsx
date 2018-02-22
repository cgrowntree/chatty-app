import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    console.log('Rendering <Navbar/>');
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Slacker</a>
      </nav>
    );
  }
}

export default Navbar;