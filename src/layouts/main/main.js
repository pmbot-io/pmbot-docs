import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/shared/header';
import Footer from 'components/shared/footer';
import Sidebar from 'components/shared/sidebar';
import Seo from 'components/shared/seo';
import styles from './main.module.scss';

const Main = ({ children, seoMetadata, sidebar = false }) => (
  <>
    <Seo {...seoMetadata} />
    <Header />
    <main>
      <div className="container">
        <div className={`columns ${styles.columns}`}>
          <div className="column is-narrow">
            {!!sidebar && <Sidebar sidebar={sidebar} slug={seoMetadata.slug} />}
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

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
