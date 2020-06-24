import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/shared/header';
import Footer from 'components/shared/footer';
import Sidebar from 'components/shared/sidebar';
import Seo from 'components/shared/seo';
import styles from './main.module.scss';

const Main = ({ children, pageMetadata, sidebar = false }) => (
  <>
    <Seo {...pageMetadata} />
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.inner}>
        <div className="container">
          <div className="columns">
            <div className="column is-narrow">
              {!!sidebar && (
                <Sidebar sidebar={sidebar} slug={pageMetadata.data.slug} />
              )}
            </div>
            <div className={`column ${styles.right}`}>
              <div className={styles.rightWrapper}>{children}</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
