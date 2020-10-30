import React from 'react';
import {Link} from 'gatsby';
import LogoInlineSvg from 'images/logo.inline.svg';
import styles from './footer.module.scss';

import WavesSvgUrl from './waves.svg';
import { BLOG_URL, SUPPORT_URL } from '../../../constants/urls';

const Footer = props => (
  <footer className={styles.wrapper}>
    <div className={styles.wrapperIllustration}>
      <img src={WavesSvgUrl} className={styles.illustration}/>
    </div>
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-12-mobile is-2-tablet is-5-desktop">
          <div className={styles.logo}>
            <Link to="/">
              <LogoInlineSvg/>
            </Link>
          </div>
        </div>
        <div
          className={`column is-12-mobile is-10-tablet is-7-desktop ${styles.rigth}`}
        >
          <div className={styles.section}>
            <div className={styles.sectionName}>Pages</div>
            <div>
              <a href="https://docs.pmbot.io" className={`link ${styles.link}`}>
                Documetation
              </a>
            </div>
            <div>
              <a
                href={SUPPORT_URL}
                className={`link ${styles.link}`}
              >
                Support
              </a>
            </div>
            <div>
              <a
                href={BLOG_URL}
                className={`link ${styles.link}`}
              >
                Blog
              </a>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionName}>Legal</div>
            <div>
              <a href="/legals/cookie-policy" className={`link ${styles.link}`}>
                Cookie policy
              </a>
            </div>
            <div>
              <a href="/legals/privacy-policy" className={`link ${styles.link}`}>
                Privacy policy
              </a>
            </div>
            <div>
              <a href="/legals/terms-of-service" className={`link ${styles.link}`}>
                Term of service
              </a>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionName}>Contact us</div>
            <a href={SUPPORT_URL} className={`link ${styles.link}`}>
              Support
            </a>
            <a
              href={typeof atob !== 'undefined' ? atob('bWFpbHRvOmluZm9AcG1ib3QuY29t') : ''}
              className={`link ${styles.link}`}
            >
              General inquiries
            </a>
            <a
              href={typeof atob !== 'undefined' ? atob('bWFpbHRvOnNhbGVzQHBtYm90LmNvbQ') : undefined}
              className={`link ${styles.link}`}
            >
              Sales
            </a>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <div className={styles.company}>
          Crafted by{' '}
          <a
            href="https://charlie-bravo.be"
            className={`link ${styles.companyLink}`}
            target="_blank"
          >
            Charlie Bravo
          </a>,
          graphics design by{' '}
          <a
            href="https://pixelpoint.io/"
            className={`link ${styles.companyLink}`}
            target="_blank"
          >
            Pixel Point
          </a>
        </div>
        <div className={styles.footerCopyrightText}>
          Pmbot &copy; {new Date().getFullYear()} - All rights reserved
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
