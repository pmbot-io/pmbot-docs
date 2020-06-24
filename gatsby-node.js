const path = require('path');
const {
  slugify,
  buildFileTree,
  buildFileTreeNode,
  unorderify,
  compose,
  buildBreadcrumbs,
} = require('./src/utils/utils');

/* aux local helpers */

// creating-docs-pages-specific function; extracts the category after
// 'docs'; e.g. /whatever/some-more -> whatever
// getDocSection(str: String) -> String
const getDocTopLevelSection = str => str.replace(/^\/(.*?)\/.*$/, '$1');

const stripDocRoot = str => str.replace(/^\/docs/, '');

const isSectionPage = path => {
  return path === getDocTopLevelSection(path);
};

// main doc page template
const docPageTemplate = path.resolve(`src/templates/doc-page.js`);
// aux doc page template
const sectionPageTemplate = path.resolve(`src/templates/doc-section-page.js`);

async function createDocPages({ actions: { createPage }, graphql, reporter }) {
  // doc pages query
  const { data } = await graphql(`
    query docPagesQuery {
      allFile(
        filter: { ext: { eq: ".md" }, relativeDirectory: { regex: "/docs/" } }
        sort: { fields: absolutePath, order: ASC }
      ) {
        nodes {
          name
          relativeDirectory
          children {
            ... on MarkdownRemark {
              html
              frontmatter {
                title
                excerpt
                isHomePage
              }
            }
          }
        }
      }
    }
  `);

  // Tree-structure handlers
  const { getTreePart, addNode } = buildFileTree(buildFileTreeNode);

  // first iteration, build our tree
  data.allFile.nodes.forEach(({ name, relativeDirectory, children }) => {
    const {
      frontmatter: { title, isHomePage },
    } = children[0];
    // build a proper path

    const entryPath = compose(
      slugify,
      unorderify,
      stripDocRoot
    )(`/${relativeDirectory}/${title || name}`);

    // populate our tree representation with actual nodes
    addNode(unorderify(relativeDirectory), unorderify(name), {
      path: isHomePage ? '/' : entryPath,
      title,
    });
  });

  // second iteration, create actual doc pages
  data.allFile.nodes.forEach(
    ({ name, relativeDirectory, children, children: [remarkNode] }) => {
      // for debuggin purpose in case there are errors in md/html syntax
      if (typeof remarkNode === 'undefined') {
        console.log('remarkNode is', remarkNode);
        console.log('children is', children);
        console.log(
          '\nmarkup is broken! check the following file: \n\n',
          `${relativeDirectory}/${name}`
        );
        return;
      }
      const { title, isHomePage } = remarkNode.frontmatter;

      // build a proper path
      const entryPath = isHomePage
        ? '/'
        : compose(
            slugify,
            unorderify,
            stripDocRoot
          )(`/${relativeDirectory}/${title || name}`);

      const extendedRemarkNode = {
        ...remarkNode,
        frontmatter: {
          ...remarkNode.frontmatter,
          slug: entryPath,
          // injection of a link to an article in git repo
          fileOrigin: encodeURI(
            process.env.GATSBY_GITHUB_DOCS_URL +
              `/${relativeDirectory}/${name}.md`
          ),
        },
      };

      // build the breadcrumbs data
      const breadcrumbs = buildBreadcrumbs(entryPath);
      createPage({
        path: entryPath,
        component: docPageTemplate,
        context: {
          remarkNode: extendedRemarkNode,
          title: title || unorderify(name),
          sidebarTree: getTreePart(['docs']),
          breadcrumbs,
        },
      });
    }
  );
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  // Adding default values for some fields and moving them under node.fields
  if (node.frontmatter) {
    createNodeField({
      node,
      name: 'excerpt',
      value: node.frontmatter.excerpt || '',
    });
  }
};

exports.createPages = async options => {
  await createDocPages(options);
};
