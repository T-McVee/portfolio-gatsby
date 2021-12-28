import React from 'react';
import styled from 'styled-components';
import Tags from './Tags';
import Links from './Links';

const Description = (props) => {
  const { rightAlign, title, subtitle, body, links, tags } = props;

  return (
    <Wrapper rightAlign={rightAlign} data-testid="description">
      <h2>{title}</h2>
      <p className="subtitle" rightAlign={rightAlign} data-testid="subtitle">
        {subtitle}
      </p>
      <p className="body" data-testid="body">
        {body}
      </p>
      <Links links={links} rightAlign={rightAlign} data-testid="links" />
      <Tags tags={tags} rightAlign={rightAlign} data-testid="tags" />
    </Wrapper>
  );
};

export default Description;

const Wrapper = styled.div`
  width: 42%;
  max-width: 500px;

  h2 {
    font-weight: 300;
    margin-bottom: 1rem;
    font-size: 2rem;
    text-align: ${(props) => (props.rightAlign ? 'left' : 'right')};
  }

  .subtitle {
    color: ${(props) => props.theme.colorAccent2};
    text-align: ${(props) => (props.rightAlign ? 'left' : 'right')};
    font-size: 1.5rem;
    font-weight: 300;
    text-transform: lowercase;
    margin-bottom: 1rem;
  }

  .body {
    font-size: 1.2rem;
    text-align: ${(props) => (props.rightAlign ? 'left' : 'right')};
    margin-bottom: 1rem;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpointXlScreen}) {
    h2 {
      font-size: 1.5rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }

    .body {
      font-size: 1rem;
      line-height: 1.2rem;
    }
  }

  @media screen and (max-width: ${(props) => props.theme.breakpointLaptop}) {
    width: 100%;
    max-width: 100%;
    margin-top: 1rem;

    h2 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.5rem;
    }

    .body {
      font-size: 1.2rem;
      line-height: 1.5rem;
    }
  }

  @media screen and (max-width: ${(props) => props.theme.breakpointTablet}) {
    h2 {
      font-size: 1.5rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }

    .body {
      font-size: 1rem;
    }
  }
`;
