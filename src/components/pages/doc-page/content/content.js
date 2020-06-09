import React, { useRef } from 'react';
import { useElementsReplacement, useScrollToAnchor } from 'hooks';
import HeadingMark from 'components/shared/heading-mark';
import Blockquote from 'components/shared/blockquote';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import styles from './content.module.scss';
import './content.scss';

const components = {
  h2: ({ mdBlockContent }) => <HeadingMark content={mdBlockContent} />,
  table: ({ mdBlockContent }) => (
    <div className={styles.tableWrapper}>
      <table dangerouslySetInnerHTML={{ __html: mdBlockContent }} />
    </div>
  ),
  '.blockquote': Blockquote,
};

const Content = ({ content }) => {
  const containerRef = useRef(null);
  useElementsReplacement(
    {
      containerRef,
      components,
    },
    [content]
  );
  useScrollToAnchor();
  return (
    <div
      ref={containerRef}
      className={styles.wrapper}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Content;
