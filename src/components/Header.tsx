import React from 'react';
const Logo = require('../assets/images/logo.svg');

const Header = (): JSX.Element => {
  return (
    <header>
      <a href="/">
        <img src={Logo} className="logo" alt="Avia logo" />
      </a>
    </header>
  );
};

export default Header;
