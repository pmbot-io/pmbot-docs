import React from 'react';
import { Link } from 'gatsby';
import styles from './content-table.module.scss';

const ContentTable = ({ sectionLinks }) => {
  return (
    <div className={styles.wrapper}>
      <h2 id="table-of-content">Table of Content</h2>
      <ul>
        {sectionLinks.map(({ path, title }, i) => (
          <li>
            <Link to={path} key={`lr-${i}`}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentTable;