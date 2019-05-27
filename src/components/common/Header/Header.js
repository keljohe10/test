import React from 'react';
import './styles.css';
import logo from '../assets/ceb-logo.svg';

class Header extends React.Component {
  render() {
    return (
      <div className="appbar pt-3 pb-3">
        <a href="https://test.cebroker.com">
          <img
            src={logo}
            alt="CE Broker"
          />
        </a>
      </div>
    );
  }
}

export default Header;
