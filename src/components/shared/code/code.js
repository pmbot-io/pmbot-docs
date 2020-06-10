import * as React from 'react';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/command-line/prism-command-line.css';
import styles from './code.module.scss';

const Code = ({ children, noLineNumbers }) => {
  return (
    <div
      className={`${styles.code} ${styles.codeContainer} ${
        noLineNumbers ? styles.noLineNumbers : ''
      }`}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};

export default Code;
