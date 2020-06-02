import React, { useState } from 'react';
import { Link } from 'gatsby';
import Media from 'react-media';
import HeaderMobile from 'components/shared/header-mobile';
import LogoInlineSvg from 'images/logo.inline.svg';

import styles from './header.module.scss';

const Header = props => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  return (
    <header className={styles.wrapper}>
      <div className="container">
        <div className={styles.inner}>
          <div className="header-logo">
            <Link className={styles.headerLogoLink} to="/">
              <LogoInlineSvg />
            </Link>
          </div>
          <Media
            query="(max-width: 991.98px)"
            onChange={matches =>
              matches ? setIsMobileOrTablet(true) : setIsMobileOrTablet(false)
            }
          />
          {isMobileOrTablet ? (
            <HeaderMobile />
          ) : (
            <>
              <div className={styles.headerMenu}>
                <Link to="/" className={`link ${styles.menuLink}`}>
                  How it works
                </Link>
                <Link to="/" className={`link ${styles.menuLink}`}>
                  Feautures
                </Link>
                <Link to="/" className={`link ${styles.menuLink}`}>
                  Plugins
                </Link>
                <Link to="/" className={`link ${styles.menuLink}`}>
                  Pricing
                </Link>
                <span className={styles.menuBorder}></span>
                <Link to="/" className={`link ${styles.menuLink}`}>
                  Blog
                </Link>
                <Link to="/" className={`link ${styles.menuLink}`}>
                  Documentation
                </Link>
              </div>
              <button className={`button ${styles.button}`}>Preorder</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
