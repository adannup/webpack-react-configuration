import React, { Component } from 'react';
import './Header.scss';

class Header extends Component {
  render() {
    return (
      <h1 className="title_header">{this.props.title}</h1>
    )
  }
}

export default Header;
