import React from 'react';
import LayoutMain from 'layouts/layout-main';
import Seo from 'components/shared/seo';

const NotFoundPage = () => (
  <LayoutMain>
    <Seo title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadaaaaaness.</p>
  </LayoutMain>
);

export default NotFoundPage;
