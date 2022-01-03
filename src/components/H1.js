import React from 'react';
import styled from 'styled-components';

const H1 = ({ children, fontSize }) => {
  return <Wrapper fontSize={fontSize}>{children}</Wrapper>;
};

export default H1;

const Wrapper = styled.h1`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '4rem')};
  width: 100%;
  margin-bottom: 4rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpointTablet}) {
    font-size: 3rem;
    overflow-wrap: break-word;
  }
`;
