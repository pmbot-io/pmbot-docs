import React from 'react';
import { default as LayoutMain } from 'layouts/main';
import Content from 'components/pages/doc-page/content';
import ContentTable from 'components/pages/doc-page/content-table';
import Breadcrumbs from 'components/shared/breadcrumbs';
import contentStyles from 'components/pages/doc-page/content/content.module.scss';

export default function({
  pageContext: {
    title,
    excerpt,
    slug,
    content,
    sidebarTree,
    sectionLinks,
    breadcrumbs,
  },
}) {
  return (
    <LayoutMain
      seoMetadata={{ title, content: excerpt, slug }}
      sidebar={sidebarTree}
    >
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Content content={content} className={contentStyles.wrapperSection} />
      <ContentTable sectionLinks={sectionLinks} />
    </LayoutMain>
  );
}
