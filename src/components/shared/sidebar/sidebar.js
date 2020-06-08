import React, { useEffect, useState, useRef } from 'react';
import Media from 'react-media';
import cn from 'classnames';
import styles from './sidebar.module.scss';
import Search from 'components/shared/search';
import { Link, withPrefix } from 'gatsby';
import ArrowSvg from 'images/arrow.inline.svg';
import { navigate } from 'gatsby';

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

// renders options from the passed children array, recursively
const OptionsGroup = ({
  node: {
    meta: { path, title },
    name,
  },
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(doesPathnameMatch(path));
  }, []);

  return (
    <option label={title || name} value={path} selected={isActive}>
      {title || name}
    </option>
  );
};

const Sidebar = ({ sidebar, slug }) => {
  const pathContainsCategory = (path, category) => path.includes(category);

  const selectMenu = useRef();

  const navigateMobile = () => navigate(selectMenu.current.value);

  return (
    <div className={styles.wrapper}>
      <Search />
      <Media
        query="(min-width: 768px)"
        render={() => (
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
                        e.target.nextSibling.classList.toggle(
                          styles.dropdownActive
                        )
                      }
                      className={styles.title}
                    >
                      {title || name}
                      <ArrowSvg className={styles.arrow} />
                    </span>
                    <div
                      className={cn(styles.dropdown, {
                        [styles.dropdownActive]: pathContainsCategory(
                          slug,
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
        )}
      />

      <Media
        query="(max-width: 767.98px)"
        render={() => (
          <div className={styles.selectWrapper}>
            <select
              ref={selectMenu}
              onChange={() => navigateMobile()}
              className={styles.select}
            >
              {Object.values(sidebar).map(
                ({ meta: { title, path }, name, children }, i) => {
                  return (
                    <optgroup label={title || name} key={name}>
                      {Object.values(children).map(node => (
                        <OptionsGroup node={node} key={node.name} />
                      ))}
                    </optgroup>
                  );
                }
              )}
            </select>
          </div>
        )}
      />
    </div>
  );
};

export default Sidebar;
