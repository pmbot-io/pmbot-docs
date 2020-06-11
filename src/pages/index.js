import { navigate } from 'gatsby';

const IndexPage = () => {
  if (typeof window !== 'undefined') {
    navigate('/introduction');
  }
  return null;
};

export default IndexPage;
