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

  .ReactModal__Body--open {
    overflow: hidden;
  }

  .bold {
    font-weight: 600;
  }

  .icons {
    

    span {
      position: absolute;
      height: 1px;
      width: 1px;
      clip: rect(1px, 1px, 1px, 1px);
      overflow: hidden;
    }
  

    a {
      text-decoration: none;
      color: ${(props) => props.theme.colorBlack};
      transform: translate(50%);
      transition: color ${(props) => props.theme.time};

      &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.colorAccent1};
      }
    }

  .icon {
    font-size: 2rem;
    margin: 0 1rem;
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
