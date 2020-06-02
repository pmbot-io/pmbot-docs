import React from 'react';
import styles from './search.module.scss';
import SearchIconSvg from 'images/search.inline.svg';

const Search = props => (
  <form action="" className={styles.wrapper}>
    <SearchIconSvg className={styles.icon} />
    <input
      type="text"
      placeholder="Search documentation..."
      className={styles.input}
    />
  </form>
);

export default Search;
