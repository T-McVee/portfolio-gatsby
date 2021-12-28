import React from 'react';
import styled from 'styled-components';

const Tag = ({ text, rightAlign }) => {
  return (
    <Wrapper rightAlign={rightAlign} data-testid="tag">
      {text}
    </Wrapper>
  );
};

export default Tag;

const Wrapper = styled.li`
  width: fit-content;
  padding: 0.5rem 1.5rem;
  list-style: none;
  font-size: 1.2rem;
  text-transform: lowercase;
  color: ${(props) => props.theme.colorWhite};
  background-color: ${(props) => props.theme.colorGrey};
  border-radius: ${(props) => props.theme.radiusSmall};
  margin: 0.5rem 0.5rem 0 0;
  transition: transform 0.2s;

  &:hover {
    cursor: default;
    transform: scale(1.02);
  }

  @media screen and (max-width: ${(props) => props.theme.breakpointXlScreen}) {
    font-size: 1rem;
    padding: 0.5rem 1.25rem;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpointLaptop}) {
    font-size: 1.2rem;
    padding: 0.5rem 1.5rem;
    margin: ${(props) =>
      props.rightAlign ? '0.5rem 0.5rem 0 0' : '0.5rem 0 0 0.5rem'};
  }

  @media screen and (max-width: ${(props) => props.theme.breakpointTablet}) {
    font-size: 1rem;
    padding: 0.5rem 1.25rem;
  }
`;
