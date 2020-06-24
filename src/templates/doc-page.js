import React from 'react';
import { default as LayoutMain } from 'layouts/main';
import Content from 'components/pages/doc-page/content';
import Breadcrumbs from 'components/shared/breadcrumbs';

export default function(props) {
  const {
    pageContext: {
      remarkNode: { html, frontmatter },
      sidebarTree,
      breadcrumbs,
    },
  } = props;

  const pageMetadata = {
    data: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      slug: frontmatter.slug,
    },
  };

  return (
    <LayoutMain pageMetadata={pageMetadata} sidebar={sidebarTree}>
      {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
      <Content content={html} />
    </LayoutMain>
  );
}
