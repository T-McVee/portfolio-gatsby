import React from 'react';
import styled from 'styled-components';

const Button = ({ children, handleClick }) => {
  return <Wrapper onClick={handleClick}>{children}</Wrapper>;
};

export default Button;

const Wrapper = styled.button`
  font-size: 1.2rem;

  color: ${({ theme }) => theme.colorWhite};
  background-color: ${({ theme }) => theme.colorAccent1};
  padding: 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.radiusSmall};
  margin-top: 0.5rem;

  &:hover {
    cursor: pointer;
    outline: 1px solid black;
  }
`;
