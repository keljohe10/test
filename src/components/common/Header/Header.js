import React from 'react';
import './styles.css';

class Header extends React.Component {
  render() {
    return (
      <div className="appbar pt-3 pb-3">
        <a href="https://cebroker.com">
          <img
            src={process.env.PUBLIC_URL + '/assets/ceb-logo.svg'}
            alt="CE Broker"
          />
        </a>
      </div>
    );
  }
}

export default Header;
