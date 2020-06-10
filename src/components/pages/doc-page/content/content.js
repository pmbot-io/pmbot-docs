import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import { useElementsReplacement, useScrollToAnchor } from 'hooks';
import HeadingMark from 'components/shared/heading-mark';
import CodeGroup from 'components/shared/code-group';
import Blockquote from 'components/shared/blockquote';
import LinksBlock from 'components/shared/links-block';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import styles from './content.module.scss';
import './content.scss';

const cx = classNames.bind(styles);

const components = {
  h2: ({ mdBlockContent }) => <HeadingMark content={mdBlockContent} />,
  '.code-group': CodeGroup,
  table: ({ mdBlockContent }) => (
    <div className={styles.tableWrapper}>
      <table dangerouslySetInnerHTML={{ __html: mdBlockContent }} />
    </div>
  ),
  '.blockquote': Blockquote,
  '.links-block': LinksBlock,
};

const Content = ({ className, content }) => {
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
      className={cx('wrapper', className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Content;
