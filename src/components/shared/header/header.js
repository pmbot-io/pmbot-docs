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
                <a href="/" className={`link ${styles.menuLink}`}>
                  How it works
                </a>
                <a href="/" className={`link ${styles.menuLink}`}>
                  Feautures
                </a>
                <a href="/" className={`link ${styles.menuLink}`}>
                  Plugins
                </a>
                <a href="/" className={`link ${styles.menuLink}`}>
                  Pricing
                </a>
                <span className={styles.menuBorder}></span>
                <a href="/" className={`link ${styles.menuLink}`}>
                  Blog
                </a>
                <a href="/" className={`link ${styles.menuLink}`}>
                  Documentation
                </a>
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
