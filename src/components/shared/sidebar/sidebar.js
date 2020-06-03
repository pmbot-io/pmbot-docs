import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './sidebar.module.scss';
import Search from 'components/shared/search';
import { Link, withPrefix } from 'gatsby';
import ArrowSvg from 'images/arrow.inline.svg';
import { slugify } from 'utils';

const doesPathnameMatch = path => {
  const maybePrefixedPath = withPrefix(path);
  const doesPathMatchLocation = maybePrefixedPath === window.location.pathname;

  return doesPathMatchLocation;
};

// renders sidebar nodes from passed children prop, recursively
const SidebarNode = ({
  node: {
    meta: { path, title },
    name,
  },
}) => {
  const [isActive, setIsActive] = useState(false);
  const isLink = !!path;

  useEffect(() => {
    setIsActive(doesPathnameMatch(path));
  }, []);

  return (
    <>
      {isLink ? (
        <Link
          to={path}
          className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
        >
          {title || name}
        </Link>
      ) : (
        <span className={styles.title}>{title || name}</span>
      )}
    </>
  );
};

const Sidebar = ({ sidebar, pageSlug }) => {
  const pathContainsCategory = (path, category) => path.includes(category);
  return (
    <div className={styles.wrapper}>
      <Search />
      <nav className={styles.nav}>
        {Object.values(sidebar).map(
          ({ meta: { title, path }, name, children }, i) =>
            i === 0 ? (
              <div
                key={name}
                className={cn(styles.section, styles.sectionMain)}
              >
                <span className={styles.title}>{title || name}</span>
                <div className={styles.menu}>
                  {Object.values(children).map(node => (
                    <SidebarNode node={node} key={node.name} />
                  ))}
                </div>
              </div>
            ) : (
              <div key={name} className={styles.section}>
                <span
                  onClick={e =>
                    e.target.nextSibling.classList.toggle(styles.dropdownActive)
                  }
                  className={styles.title}
                >
                  {title || name}
                  <ArrowSvg className={styles.arrow} />
                </span>
                <div
                  className={cn(styles.dropdown, {
                    [styles.dropdownActive]: pathContainsCategory(
                      pageSlug,
                      name
                    ),
                  })}
                >
                  {Object.values(children).map(node => (
                    <SidebarNode node={node} key={node.name} />
                  ))}
                </div>
              </div>
            )
        )}
      </nav>
    </div>
  );
};

const Sidebar_ = props => (
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
          Recipes
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
