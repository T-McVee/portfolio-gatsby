import * as React from 'react';
import Splash from '../components/splash/Splash';
import Bio from '../components/bio/Bio';
import Layout from '../components/layout';

const IndexPage = () => {
  return (
    <Layout>
      <div>
        <Splash />
        <Bio />
      </div>
    </Layout>
  );
};

export default IndexPage;
