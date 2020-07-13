import React from 'react';
import { useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import styles from './banner.module.scss';

const Banner = ({ title, buttonText, articleSrc }) => {
  const {
    illustration: {
      childImageSharp: { fluid: imageFluid },
    },
  } = useStaticQuery(graphql`
    query {
      illustration: file(relativePath: { eq: "banner/illustration.png" }) {
        childImageSharp {
          fluid(maxWidth: 780, quality: 80) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `);
  return (
    <div className={styles.wrapper}>
      <Img fluid={imageFluid} className={styles.img} />
      <p className={styles.title}>{title}</p>
      <a
        className={`button ${styles.button}`}
        href={articleSrc}
        target="_blank"
      >
        {buttonText}
      </a>
    </div>
  );
};

Banner.defaultProps = {
  title: 'Help us to improve this documentation',
  buttonText: 'Suggest edits',
};

export default Banner;
