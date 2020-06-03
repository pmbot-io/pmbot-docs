import React from 'react';
import LayoutMain from 'layouts/layout-main';
import Content from 'components/pages/doc-page/content';
import Breadcrumbs from 'components/shared/breadcrumbs';

export default function({
  pageContext: { title, excerpt, slug, content, s, sidebarTree, breadcrumbs },
}) {
  return (
    <LayoutMain
      seoMetadata={{ title, content: excerpt, slug }}
      sidebar={sidebarTree}
    >
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Content content={content} />
    </LayoutMain>
  );
}
