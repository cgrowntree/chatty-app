import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    console.log('Rendering <Navbar/>');
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Slacker</a>
        <a className="navbar-counter">{this.props.userCount} users online</a>
      </nav>
    );
  }
}

export default Navbar;