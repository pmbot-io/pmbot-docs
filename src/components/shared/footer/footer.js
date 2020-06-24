import React from 'react';
import { Link } from 'gatsby';
import LogoInlineSvg from 'images/logo.inline.svg';
import styles from './footer.module.scss';

import WavesSvgUrl from './waves.svg';

const Footer = props => (
  <footer className={styles.wrapper}>
    <div className={styles.wrapperIllustration}>
      <img src={WavesSvgUrl} className={styles.illustration} />
    </div>
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-12-mobile is-2-tablet is-5-desktop">
          <div className={styles.logo}>
            <Link to="/">
              <LogoInlineSvg />
            </Link>
          </div>
        </div>
        <div
          className={`column is-12-mobile is-10-tablet is-7-desktop ${styles.rigth}`}
        >
          <div className={styles.section}>
            <div className={styles.sectionName}>Pages</div>
            <div>
              <Link to="/" className={`link ${styles.link}`}>
                Plugins
              </Link>
            </div>
            <div>
              <Link to="/" className={`link ${styles.link}`}>
                Documetation
              </Link>
            </div>
            <div>
              <Link to="/" className={`link ${styles.link}`}>
                Blog
              </Link>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionName}>Legal</div>
            <div>
              <Link to="/" className={`link ${styles.link}`}>
                Privacy policy
              </Link>
            </div>
            <div>
              <Link to="/" className={`link ${styles.link}`}>
                Term of service
              </Link>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionName}>Contact us</div>
            <a
              href="mailto:support@pmbot.com"
              className={`link ${styles.link}`}
            >
              support@pmbot.com
            </a>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <div className={styles.company}>
          Created by{' '}
          <a
            href="https://charlie-bravo.be/"
            className={`link ${styles.companyLink}`}
            target="_blank"
          >
            Charlie Bravo
          </a>
        </div>
        <div className={styles.footerCopyrightText}>
          <a href="https://pmbot.io" className={`link ${styles.companyLink}`}>
            Pmbot
          </a>{' '}
          &copy; {new Date().getFullYear()} - All rights reserved
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
