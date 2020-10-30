import React, {useState} from 'react';
import Media from 'react-media';
import HeaderMobile from 'components/shared/header-mobile';
import LogoInlineSvg from 'images/logo.inline.svg';

import styles from './header.module.scss';
import { BLOG_URL, CLOUD_URL, DOCS_URL, SUPPORT_URL } from '../../../constants/urls';

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
                  href={BLOG_URL}
                  className={`link ${styles.link}`}
                >
                  Blog
                </a>
                <a
                  href={DOCS_URL}
                  className={`link ${styles.link} ${styles.linkActive}`}
                >
                  Documentation
                </a>
                <a
                  href={SUPPORT_URL}
                  className={`link ${styles.link}`}
                >
                  Support
                </a>
                <a
                  className={`button ${styles.button}`}
                   href={CLOUD_URL}
                >
                  Sign in
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
