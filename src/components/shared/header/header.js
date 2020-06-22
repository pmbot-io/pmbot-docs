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
              <LogoInlineSvg /> <span className={styles.headerLogoSubtitle}>Docs</span>
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
                <a href="https://blog.pmbot.io" className={`link ${styles.menuLink}`}>
                  Blog
                </a>
                <a href="https://github.com/pmbot-io/issues/issues" className={`link ${styles.menuLink}`}>
                  Issues
                </a>
              </div>
              <a className={`button ${styles.button}`} href="https://pmbot.io">Preorder</a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
