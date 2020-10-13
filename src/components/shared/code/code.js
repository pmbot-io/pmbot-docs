import * as React from 'react';
import classNames from 'classnames/bind';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/command-line/prism-command-line.css';
import 'prismjs/prism';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/components/prism-json.min';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-yaml.min';
import 'prismjs/components/prism-bash.min';
import styles from './code.module.scss';

const cx = classNames.bind(styles);

const Code = ({ children, noLineNumbers }) => {
  return (
    <div
      className={cx('code', styles.codeContainer, {
        noLineNumbers: noLineNumbers,
      })}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};

export default Code;
