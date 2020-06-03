import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/shared/header';
import Footer from 'components/shared/footer';
import Sidebar from 'components/shared/sidebar';
import Seo from 'components/shared/seo';
import styles from './layout-main.module.scss';

const LayoutMain = ({ children, seoMetadata, sidebar }) => (
  <>
    <Seo {...seoMetadata} />
    <Header />
    <main>
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-narrow">
            <Sidebar sidebar={sidebar} pageSlug={seoMetadata.slug} />
          </div>
          <div className="column">
            <div className={styles.inner}>{children}</div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

LayoutMain.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutMain;
