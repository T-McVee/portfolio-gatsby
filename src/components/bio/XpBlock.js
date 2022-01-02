import React from 'react';
import styled from 'styled-components';

const XpBlock = (props) => {
  const { heading, number } = props;

  return (
    <Wrapper>
      <h2>{heading}:</h2>
      <div className="outer">
        <div className="bigNumber" data-testid="number">
          {number}
        </div>
        <div className="midChar">+</div>
        <div className="inner">Years of experience</div>
      </div>
    </Wrapper>
  );
};

export default XpBlock;

const Wrapper = styled.div`
  margin-right: 2rem;

  &:first-of-type {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1rem;
    font-weight: 300;
    text-transform: lowercase;
    color: ${({ theme }) => theme.colorDarkGrey};
    margin-bottom: 1rem;
  }

  .outer {
    display: flex;
    flex-direction: row;
  }

  .bigNumber {
    font-size: 6rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colorAccent1};
    line-height: 3.5rem;
  }

  .midChar {
    color: ${({ theme }) => theme.colorAccent1};
    font-size: 2rem;
    line-height: 1rem;
    font-weight: 600;
    margin-right: 0.5rem;
  }

  .inner {
    font-size: 2rem;
    width: 10rem;
    line-height: 1.8rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpointTablet}) {
    .bigNumber {
      font-size: 4rem;
    }

    .midChar {
      font-size: 1.5rem;
    }
  }
`;
