import React from 'react';
import classNames from 'classnames';

export const Blockquote = ({ mdBlockContent, mod }) => {
  // prevent nesting blockquote tags
  const blockquoteInner = mdBlockContent.replace(/<\/?blockquote>/g, '');

  return (
    <blockquote
      className={classNames({
        warning: mod === 'warning',
      })}
      dangerouslySetInnerHTML={{
        __html: blockquoteInner,
      }}
    />
  );
};
