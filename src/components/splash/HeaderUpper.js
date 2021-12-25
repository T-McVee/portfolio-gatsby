import React, { useEffect } from 'react';
import styled from 'styled-components';
// import Rellax
import { ButtonCta } from '../ButtonCta';

const HeaderUpper = ({ handleOpenModal }) => {
  useEffect(() => {
    // new Rellax('.rellax', {});
  }, []);

  return (
    <Wrapper className="rellax" data-rellax-speed="2">
      <h1>
        Tim <br /> <span className="bold">McVinish</span>
      </h1>
      <ButtonCta text="get in contact" handleClick={handleOpenModal} />
    </Wrapper>
  );
};

export default HeaderUpper;

const Wrapper = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  height: calc(100% - 14rem);
  border-right: 1px solid ${(props) => props.theme.colorBlack};

  h1 {
    font-size: 4.5rem;
    font-weight: 400;
    text-transform: uppercase;
    line-height: 5rem;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpointPhone}) {
    h1 {
      font-size: 2.5rem;
      line-height: 3rem;
    }
  }

  .bold {
    font-weight: 600;
  }
`;
