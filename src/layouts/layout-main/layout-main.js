import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/shared/header';
import styles from './layout-main.module.scss';
import Footer from 'components/shared/footer';

const LayoutMain = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

LayoutMain.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutMain;
