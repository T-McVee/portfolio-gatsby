import React from 'react';
import styled from 'styled-components';
import ButtonCta from './ButtonCta';

const LowerCta = ({ handleOpenModal }) => {
  return (
    <Wrapper>
      <h1>Let's connect</h1>
      <ButtonCta text="Get in contact" handleClick={handleOpenModal} />
    </Wrapper>
  );
};

export default LowerCta;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colorLightGrey};
  padding: 0 5.5rem 12rem 5.5rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpointTablet}) {
    padding: 0 5.5rem 4rem 5.5rem;
  }
`;
