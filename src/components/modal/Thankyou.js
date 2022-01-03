import React from 'react';
import styled from 'styled-components';
import H1 from '../H1';
import Button from '../Button';

const Thankyou = ({ handleClick }) => {
  return (
    <Wrapper>
      <H1 fontSize="3rem">Cheers!</H1>
      <span>🧑‍🚀</span>
      <p>Message received.</p>
      <p>We'll contact you shortly.</p>
      <Button handleClick={handleClick}>Close</Button>
    </Wrapper>
  );
};

export default Thankyou;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  p {
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 4rem;
    margin-left: 0.5rem;
  }
`;
