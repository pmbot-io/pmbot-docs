import React from 'react';
import cn from 'classnames';
import styles from './sidebar.module.scss';
import Search from 'components/shared/search';
import { Link } from 'gatsby';
import ArrowSvg from 'images/arrow.inline.svg';

const Sidebar = props => (
  <div className={styles.wrapper}>
    <Search />
    <nav className={styles.nav}>
      <div className={cn(styles.section, styles.sectionMain)}>
        <span className={styles.title}>Documentation</span>
        <div className={styles.menu}>
          <Link
            to={'/docs/'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Introduction
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Quick Start
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Plugin library
          </Link>
        </div>
      </div>
      <div className={styles.section}>
        <Link
          to={'#'}
          className={styles.title}
          activeClassName={styles.linkActive}
        >
          Recipes <ArrowSvg className={styles.arrow} />
        </Link>
        <div className={styles.dropdown}>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Introduction
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Quick Start
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Plugin library
          </Link>
        </div>
      </div>

      <div className={styles.section}>
        <Link
          to={'/'}
          className={styles.title}
          activeClassName={styles.linkActive}
        >
          reference guides <ArrowSvg className={styles.arrow} />
        </Link>
        <div className={cn(styles.dropdown, styles.dropdownActive)}>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Preparing Your Environment
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            A/B Testing
          </Link>
          <Link
            to={'/'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying & Hosting
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Preparing a Site for Deployment
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying to Netlify
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying to AWS Amplify
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying to S3 & CloudFront
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying to Aerobatic
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying to Heroku
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying to ZEIT Now
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying to Cloudflare Workers
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying to GitLab Pages
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying to Render
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying to Tiiny Host
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying to Surge
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying to IIS
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying to Firebase Hosting
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying to KintoHub
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Deploying to Pmbot Cloud
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Adding a Path Prefix
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Multi-Core Builds
          </Link>
          <Link
            to={'#'}
            className={styles.link}
            activeClassName={styles.linkActive}
          >
            Asset Prefix
          </Link>
        </div>
      </div>

      <div className={styles.section}>
        <Link
          to={'#'}
          className={styles.title}
          activeClassName={styles.linkActive}
        >
          pmbot api <ArrowSvg className={styles.arrow} />
        </Link>
        <div className={styles.dropdown}></div>
      </div>

      <div className={styles.section}>
        <Link
          to={'#'}
          className={styles.title}
          activeClassName={styles.linkActive}
        >
          realeses & migration <ArrowSvg className={styles.arrow} />
        </Link>
        <div className={styles.dropdown}></div>
      </div>

      <div className={styles.section}>
        <Link
          to={'#'}
          className={styles.title}
          activeClassName={styles.linkActive}
        >
          conceptual guide <ArrowSvg className={styles.arrow} />
        </Link>
        <div className={styles.dropdown}></div>
      </div>

      <div className={styles.section}>
        <Link
          to={'#'}
          className={styles.title}
          activeClassName={styles.linkActive}
        >
          reference guides <ArrowSvg className={styles.arrow} />
        </Link>
        <div className={styles.dropdown}></div>
      </div>

      <div className={styles.section}>
        <Link
          to={'#'}
          className={styles.title}
          activeClassName={styles.linkActive}
        >
          pmbot internals <ArrowSvg className={styles.arrow} />
        </Link>
        <div className={styles.dropdown}></div>
      </div>

      <div className={styles.section}>
        <Link
          to={'#'}
          className={styles.title}
          activeClassName={styles.linkActive}
        >
          contributing <ArrowSvg className={styles.arrow} />
        </Link>
        <div className={styles.dropdown}></div>
      </div>

      <div className={styles.section}>
        <Link
          to={'#'}
          className={styles.title}
          activeClassName={styles.linkActive}
        >
          partnering with pmbot <ArrowSvg className={styles.arrow} />
        </Link>
        <div className={styles.dropdown}></div>
      </div>
    </nav>
  </div>
);

export default Sidebar;
