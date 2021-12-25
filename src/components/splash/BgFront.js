import React, { useEffect } from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

const BgFront = () => {
  useEffect(() => {
    // new Rellax('.rellax');
  }, []);

  return (
    <Wrapper>
      <StaticImage
        src="../../images/bg-splash-front.png"
        placeholder="blurred"
        layout="fullWidth"
        alt="Standing on top of a mountain"
        loading="eager"
        className="hero-front rellax"
        data-rellax-speed="3"
      />
      <div
        className="mask-white rellax"
        data-rellax-speed="3"
        data-testid="white"
      />
    </Wrapper>
  );
};

export default BgFront;

const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;

  .hero-front {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    opacity: 1;
  }

  .mask-white {
    position: absolute;
    bottom: -16rem;
    left: 0;
    width: 100vw;
    height: 16rem;
    background-color: #ffffff;
  }
`;
