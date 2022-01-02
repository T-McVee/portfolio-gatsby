import React from 'react';
import styled from 'styled-components';
import SocialIcons from './SocialIcons';

const Footer = () => {
  return (
    <Wrapper>
      <SocialIcons wrapperClass="icons" />
      <a href="mailto: iam@tmcvee.com">
        <Email>iam@tmcvee.com</Email>
      </a>
      <Copywrite>
        &copy; Copyright 2021 Tim McVinish<Emoji>👨‍🚀</Emoji>
      </Copywrite>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${(props) => props.theme.colorWhite};
  background-color: ${(props) => props.theme.colorDarkGrey};
  padding: 3rem 5.5rem 2rem 5.5rem;

  a {
    color: ${(props) => props.theme.colorWhite};
    text-decoration: none;
    transition: color ${(props) => props.theme.time};

    &:hover {
      color: ${(props) => props.theme.colorAccent1};
    }
  }

  .icons {
    text-align: center;
  }
`;

const Emoji = styled.span`
  font-size: 1.2rem;
  margin-left: 0.5rem;
`;

const Email = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

const Copywrite = styled.p`
  font-size: 1rem;
  text-align: center;
`;
