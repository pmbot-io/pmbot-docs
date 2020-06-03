import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/shared/header';
import styles from './layout-main.module.scss';
import Footer from 'components/shared/footer';
import Sidebar from 'components/shared/sidebar';
import Breadcrumbs from 'components/shared/breadcrumbs';

const LayoutMain = ({ children }) => (
  <>
    <Header />
    <main>
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-narrow">
            <Sidebar />
          </div>
          <div className="column">
            <div className={styles.inner}>
              <Breadcrumbs />
              {children}
            </div>
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
