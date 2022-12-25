import React from 'react';
import styled from 'styled-components';
import H1 from '../H1';
import XpBlock from './XpBlock';

const Bio = () => {
  return (
    <Wrapper>
      <H1>Schooled in marketing, in love with technology</H1>
      <p>
        Howdy, based in Brisbane, Australia, I'm a Marketing Specialist turned
        Web Developer (Who may have taken a 7-year detour as a restaurateur in
        Canada, but that's a whole{' '}
        <a href="https://www.instagram.com/1609ssm/" target="_blank">
          other story
        </a>
        ). I find the outcomes from applying technology to life's problems
        fascinating and rewarding. It's what drew me to Web Development and what
        I inspire to create in each project.
      </p>
      <div className="xp">
        <XpBlock heading="Web development" number="4" />
        <XpBlock heading="Marketing" number="9" />
      </div>
      <hr />
    </Wrapper>
  );
};

export default Bio;

const Wrapper = styled.section`
  width: 100%;
  padding: 12rem 5.5rem;

  p {
    font-size: 1.2rem;
    margin-bottom: 4rem;
    letter-spacing: 0.5px;
    line-height: 1.8rem;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colorAccent1};
  }

  .xp {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  hr {
    margin-top: 12rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpointTablet}) {
    padding: 12rem 2rem;

    h1 {
      font-size: 3rem;
    }

    .xp {
      flex-direction: column;
    }
  }
`;
