import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import HeaderLower from './HeaderLower';
import HeaderUpper from './HeaderUpper';

const Splash = (props) => {
  const { handleOpenModal } = props;

  return (
    <Section>
      <Logo />
      <header>
        <HeaderUpper handleOpenModal={handleOpenModal} />
        <HeaderLower />
      </header>
    </Section>
  );
};

export default Splash;

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 5.5rem;
  // [BG IMG REF]
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media screen and (max-width: ${(props) => props.theme.breakpointTablet}) {
    padding: 2rem;
  }

  header {
    width: 100%;
    height: calc(100% - 80px);
  }
`;

// BG img ref
/* background-image: url(${bgImageBack}); */
