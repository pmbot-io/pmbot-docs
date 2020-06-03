import React from 'react';
import cn from 'classnames';
import styles from './breadcrumbs.module.scss';
import { Link } from 'gatsby';
import ArrowSvg from 'images/arrow.inline.svg';

const Breadcrumbs = props => (
  <div className={styles.wrapper}>
    <Link to={'#'} className={styles.link}>
      Docs <ArrowSvg className={styles.icon} />
    </Link>
    <Link to={'#'} className={styles.link}>
      Reference Guides <ArrowSvg className={styles.icon} />
    </Link>
    <span className={cn(styles.link, styles.linkActive)}>
      Deploying & Hosting
    </span>
  </div>
);

export default Breadcrumbs;
