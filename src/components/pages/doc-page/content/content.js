import React from 'react';
import styles from './content.module.scss';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import './content.scss';

const Content = ({ content }) => (
  <div className={styles.wrapper}>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

export default Content;
