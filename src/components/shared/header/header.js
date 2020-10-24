import React, {useState} from 'react';
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
            <a className={styles.headerLogoLink} href="https://pmbot.io">
              <LogoInlineSvg/>{' '}
            </a>
          </div>
          <Media
            query="(max-width: 767.98px)"
            onChange={matches =>
              matches ? setIsMobileOrTablet(true) : setIsMobileOrTablet(false)
            }
          />
          {isMobileOrTablet ? (
            <HeaderMobile/>
          ) : (
            <>
              <div className={styles.headerMenu}>
                <a
                  href="https://blog.pmbot.io"
                  className={`link ${styles.link}`}
                >
                  Blog
                </a>
                <a
                  href="https://docs.pmbot.io"
                  className={`link ${styles.link} ${styles.linkActive}`}
                >
                  Documentation
                </a>
                <a
                  href="https://discourse.pmbot.io"
                  className={`link ${styles.link}`}
                >
                  Support
                </a>
                <a className={`button ${styles.button}`} href="https://docs.pmbot.io/core/installation#installation">
                  Install
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
