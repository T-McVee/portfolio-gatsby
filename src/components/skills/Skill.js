import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Skill = (props) => {
  const { name, useFa, icon, logo } = props;
  const image = getImage(logo);

  return (
    <Wrapper data-testid="skill">
      {useFa ? (
        <FontAwesomeIcon
          icon={[icon.library, icon.icon]}
          className="icon-skill"
          data-testid="logo"
        />
      ) : (
        <GatsbyImage
          image={image}
          className="logo"
          alt={name}
          data-testid="logo"
        />
      )}
      <h2>{name}</h2>
    </Wrapper>
  );
};

export default Skill;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 12rem;
  background-color: ${(props) => props.theme.colorGrey};
  list-style: none;
  border-radius: ${(props) => props.theme.radiusSmall};
  margin: 0 1rem 1rem 0;
  padding: 1rem 0;

  .logo {
    width: 4rem;
    height: 4rem;
  }

  h2 {
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-weight: 300;
    margin-top: 0.5rem;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpointTablet}) {
    width: 8rem;
    height: 8rem;
    margin: 0 0 2rem 0;
    transform: translate(-50%);
  }

  @media screen and (max-width: 568px) {
    width: 95%;
    height: 8rem;
    padding: 0;
    margin: 0;
    transform: translate(0%);
  }
`;

const Logo = styled.img`
  @media screen and (max-width: ${(props) => props.theme.breakpointTablet}) {
    width: 3rem;
    height: 3rem;
  }
`;

const H2 = styled.h2`
  @media screen and (max-width: ${(props) => props.theme.breakpointPhone}) {
    font-size: 0.8rem;
  }
`;
