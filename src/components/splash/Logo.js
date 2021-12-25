import React from 'react';
import styled from 'styled-components';

const Logo = () => {
  return (
    <Wrapper>
      <div>
        T-<span className="bold">McVee</span>
      </div>
    </Wrapper>
  );
};

export default Logo;

const Wrapper = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  height: 80px;

  div {
    font-size: 1.5rem;
  }
`;
