import React, { useEffect, useRef, useState } from 'react';
import Media from 'react-media';
import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import Search from 'components/shared/search';
import { Link, navigate, withPrefix } from 'gatsby';
import ArrowSvg from 'images/arrow.inline.svg';
import AlgoliaQueries from 'utils/algolia';
import { useAckee } from '../../../hooks/use-analytics';

const indexName = AlgoliaQueries[0].indexName;

// local helper data
//
// algolia indices
const searchIndices = [
  { name: indexName, title: 'Doc Pages', hitComp: 'docPageHit' },
];

const cx = classNames.bind(styles);

function withoutEndSlash(str) {
  return str.replace(/\/$/, '');
}

const doesPathnameMatch = path => {
  const maybePrefixedPath = withPrefix(path);
  return withoutEndSlash(maybePrefixedPath) === withoutEndSlash(window.location.pathname);
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
  const ackee = useAckee();

  useEffect(() => {
    setIsActive(doesPathnameMatch(path));
  }, []);

  return (
    <>
      {isLink ? (
        <Link
          to={path}
          className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
          onClick={() => ackee(path)}
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
  return (
    <option label={title || name} value={path}>
      {title || name}
    </option>
  );
};

const Sidebar = ({ sidebar, slug }) => {
  const isActivePath = children =>
    Object.values(children).some(({ meta: { path } }) => slug === path);
  const selectMenu = useRef();
  const ackee = useAckee();
  const [selectedPath, setSelectedPath] = useState(slug);

  const navigateMobile = () => {
    setSelectedPath(selectMenu.current.value);
    navigate(selectMenu.current.value);
    ackee(selectMenu.current.value);
  };

  return (
    <div className={styles.wrapper}>
      <Search collapse indices={searchIndices}/>
      <Media
        query="(min-width: 768px)"
        render={() => (
          <nav className={styles.nav}>
            {Object.values(sidebar).map(
              ({ meta: { title }, name, children }, i) => (
                <div
                  key={name}
                  className={cx('section', {
                    'section-main': i === 0,
                  })}
                >
                  <span
                    onClick={({ target }) => {
                      const control = target.closest('span');
                      control.nextSibling.classList.toggle(
                        styles.dropdownActive,
                      );
                      control.firstElementChild.classList.toggle(
                        styles.arrowActive,
                      );
                    }}
                    className={styles.title}
                  >
                    {title || name}
                    <ArrowSvg
                      className={cx('arrow', {
                        [styles.arrowActive]: isActivePath(children),
                      })}
                    />
                  </span>
                  <div
                    className={cx('dropdown', {
                      [styles.dropdownActive]: isActivePath(children),
                    })}
                  >
                    {Object.values(children).map(node => (
                      <SidebarNode node={node} key={node.name}/>
                    ))}
                  </div>
                </div>
              ),
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
              value={selectedPath}
            >
              {Object.values(sidebar).map(
                ({ meta: { title, path }, name, children }, i) => {
                  return (
                    <optgroup label={title || name} key={name}>
                      {Object.values(children).map(node => (
                        <OptionsGroup node={node} key={node.name}/>
                      ))}
                    </optgroup>
                  );
                },
              )}
            </select>
          </div>
        )}
      />
    </div>
  );
};

export default Sidebar;
