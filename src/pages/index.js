import * as React from 'react';
import Splash from '../components/splash/Splash';
import Bio from '../components/bio/Bio';
import { ThemeProvider } from 'styled-components';
import Layout from '../components/layout';

const IndexPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <div>
          <Splash />
          <Bio />
        </div>
      </Layout>
    </ThemeProvider>
  );
};

export const theme = {
  colorBlack: '#000000',
  colorWhite: '#ffffff',
  colorDarkGrey: '#606060',
  colorGrey: '#D6D6D6',
  colorLightGrey: '#EBEBEB',
  colorAccent1: '#AA25FD',
  colorAccent2: '#DF4F2B',
  radiusSmall: '8px',
  time: '0.2s',
  timeLong: '0.4s',
  breakpointXlScreen: '1440px',
  breakpointLaptop: '1304px',
  breakpointTablet: '768px',
  breakpointPhone: '376px',
};

export default IndexPage;
