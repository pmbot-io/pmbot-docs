import { navigate } from 'gatsby';

const IndexPage = () => {
  if (typeof window !== 'undefined') {
    navigate('/documentation/introduction');
  }
  return null;
};

export default IndexPage;
