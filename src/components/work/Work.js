import React from 'react';
import styled from 'styled-components';
import Projects from './Projects';

const Work = () => {
  return (
    <Wrapper>
      <H1>
        Work.Work.
        <wbr />
        Work.
      </H1>
      <Projects />
    </Wrapper>
  );
};

export default Work;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 5.5rem;

  @media screen and (max-width: ${(props) => props.theme.breakpointTablet}) {
    padding: 0 2rem;
  }
`;

const H1 = styled.h1`
  font-size: 4rem;
  width: 100%;
  margin-bottom: 4rem;

  @media screen and (max-width: ${(props) => props.theme.breakpointTablet}) {
    font-size: 3rem;
    overflow-wrap: break-word;
  }
`;
