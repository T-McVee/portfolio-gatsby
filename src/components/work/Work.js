import React from 'react';
import styled from 'styled-components';
import H1 from '../H1';
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

  @media screen and (max-width: ${({ theme }) => theme.breakpointTablet}) {
    padding: 0 2rem;
  }
`;
