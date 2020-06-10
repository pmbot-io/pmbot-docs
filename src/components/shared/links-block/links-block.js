import React from 'react';

import styles from './links-block.module.scss';

const LinksBlock = ({ mdBlockContent }) => {
  const linksInner = mdBlockContent.replace(/<\/?p>/g, '');

  return (
    <div
      className={styles.wrapper}
      dangerouslySetInnerHTML={{
        __html: linksInner,
      }}
    />
  );
};

export default LinksBlock;
