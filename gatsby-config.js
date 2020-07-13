const queries = require('./src/utils/algolia');
require('dotenv').config();

const plugins = [
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: `${__dirname}/src/images`,
    },
  },
  'gatsby-transformer-sharp',
  {
    resolve: 'gatsby-plugin-sharp',
    options: {
      defaultQuality: 85,
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'gatsby-starter-default',
      short_name: 'starter',
      start_url: '/',
      background_color: '#663399',
      theme_color: '#663399',
      display: 'minimal-ui',
      icon: 'src/images/favicon.png', // This path is relative to the root of the site.
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'data',
      path: `${__dirname}/src/data/`,
    },
  },
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-prismjs',
          options: {
            showLineNumbers: true,
          },
        },
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            elements: [`h1`, `h2`, `h3`, `h4`, `h5`],
          },
        },
        {
          resolve: `gatsby-remark-images`,
          options: {},
        },
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-svgr-svgo',
    options: {
      inlineSvgOptions: [
        {
          test: /\.inline.svg$/,
          svgoConfig: {
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          },
        },
      ],
      urlSvgOptions: [
        {
          test: /\.svg$/,
          svgoConfig: {
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          },
        },
      ],
    },
  },

  'gatsby-alias-imports',
  {
    resolve: 'gatsby-plugin-sass',
    options: {
      data:
        '@import "./src/styles/variables.scss" , "./src/styles/mixins.scss";',
    },
  },
];

if (
  process.env.ALGOLIA_ADMIN_KEY &&
  process.env.GATSBY_ALGOLIA_APP_ID &&
  process.env.GATSBY_ALGOLIA_SEARCH_ONLY_KEY
) {
  plugins.push({
    resolve: 'gatsby-plugin-algolia',
    options: {
      appId: process.env.GATSBY_ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_ADMIN_KEY,
      enablePartialUpdates: true,
      queries,
      chunkSize: 10000, // default: 1000
    },
  });
}

module.exports = {
  pathPrefix: '/docs',
  siteMetadata: {
    siteTitle: 'Pmbot Docs', // <title>
    siteDescription:
      'The Pmbot documentation helps you to learn how to automate dependency updates with our solution.',
    // pathPrefix: "",
    siteImage: '/images/social-preview.jpg',
    siteLanguage: 'en',
    siteUrl: process.env.GATSBY_DEFAULT_SITE_URL,
    /* author */
    authorName: 'pixel point',
    authorTwitterAccount: '@',
  },
  plugins,
};
