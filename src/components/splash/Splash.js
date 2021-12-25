import React, { useEffect } from 'react';
import styled from 'styled-components';
import Rellax from 'rellax';
import Logo from './Logo';
import HeaderLower from './HeaderLower';
import HeaderUpper from './HeaderUpper';
import BgFront from './BgFront';
import { StaticImage } from 'gatsby-plugin-image';

const Splash = (props) => {
  const { handleOpenModal } = props;

  useEffect(() => {
    new Rellax('.rellax');
  }, []);

  return (
    <>
      <Section>
        <BgFront />
        <Logo />
        <header>
          <HeaderUpper handleOpenModal={handleOpenModal} />
          <HeaderLower />
        </header>
        <div className="mask-gradient" />

        <StaticImage
          src="../../images/bg-splash-back.jpg"
          layout="fullWidth"
          alt="logo"
          loading="eager"
          className="hero-back"
        />
      </Section>
    </>
  );
};

export default Splash;

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 5.5rem;

  header {
    width: 100%;
    height: calc(100% - 80px);
  }

  .mask-gradient {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(
      rgb(255, 250, 233, 0.35),
      rgb(255, 255, 255, 0.78)
    );
    opacity: 0.83;
  }

  .hero-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpointTablet}) {
    padding: 2rem;
  }
`;
