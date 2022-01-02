import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import SocialIcons from '../SocialIcons';

export const query = graphql`
  {
    data: allContentfulContactMethod(
      limit: 3
      sort: { fields: order, order: ASC }
    ) {
      nodes {
        id
        address
        type
        faIcon {
          library
          icon
        }
      }
    }
  }
`;

export const HeaderLower = () => {
  const {
    data: { nodes },
  } = useStaticQuery(query);

  return (
    <Wrapper className="rellax" data-rellax-speed="1.08">
      <div className="text">
        <h2>
          Web Dev{' '}
          <span className="bold">
            / <br />
            Marketer
          </span>
        </h2>
        <p>
          Hi, my name’s Tim McVinish. I love using technology to create engaging
          experiences and solve problems.
        </p>
      </div>
      <SocialIcons wrapperClass="icons vertical" iconClass="icon" />
    </Wrapper>
  );
};

export default HeaderLower;

const Wrapper = styled.div`
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: right;
  width: 100%;
  height: 224px;
  padding: 1.5rem 0 0;

  .text {
    display: flex;
    width: 256px;
    flex-direction: column;
    justify-content: right;
    align-items: flex-end;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 400;
    text-transform: uppercase;
    text-align: right;
    line-height: 2.75rem;
    width: fit-content;
    margin-bottom: 0.75rem;
    color: #000000;
  }

  p {
    text-align: right;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0.5rem;
  }

  .vertical {
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 3rem;
    height: 67%;
    justify-content: space-around;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpointLaptop}) {
    h2 {
      text-shadow: 0px 0px 26px rgba(255, 255, 255, 0.7);
    }

    p {
      text-shadow: 4px 0px 14px rgba(255, 255, 255, 1);
    }
  }
`;
