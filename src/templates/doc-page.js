import React from 'react';
import LayoutMain from 'layouts/layout-main';
import Content from 'components/pages/doc-page/content';

export default function(props) {
  return (
    <LayoutMain>
      <Content content={props.pageContext.html} />
    </LayoutMain>
  );
}
