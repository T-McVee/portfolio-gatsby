import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: Helvetica, sans-serif;
  }

  .bold {
    font-weight: 600;
  }

  .icon {
  font-size: 1.75rem;
}

  .icon-footer {
  font-size: 2rem;
  margin: 0 1rem;
  }

.icon-skill {
  font-size: 4rem;

  @media screen and (max-width: $breakpointTablet) {
    font-size: 3rem;
  }
}

  .slider {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
`;

const Layout = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Layout;

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
