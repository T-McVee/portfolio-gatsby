import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';

const Link = (props) => {
  const { text, href, rightAlign } = props;

  return (
    <Button href={href} rightAlign={rightAlign} target="blank">
      <span>
        {text === 'live' ? (
          <FontAwesomeIcon icon={faDesktop} />
        ) : (
          <FontAwesomeIcon icon={faGithub} />
        )}
        {text}
      </span>
    </Button>
  );
};

export default Link;

const Button = styled.a`
  display: flex;
  flex-direction: row;
  border: none;
  background: none;
  text-decoration: none;

  span {
    position: relative;
    font-size: 1rem;
    color: ${({ theme }) => theme.colorBlack};
    letter-spacing: 1px;
    padding: ${({ rightAlign }) =>
      rightAlign ? '0 2rem 1rem 0' : '0 0 1rem 2rem'};
  }

  svg {
    font-size: 1.2rem;
    margin-right: 0.25rem;
    transform: translateY(0.1rem);
    transition: transform ${({ theme }) => theme.time} ease-out,
      color ${({ theme }) => theme.time};
  }

  span:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1.5px;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colorAccent1};
    transform-origin: bottom
      ${({ rightAlign }) => (rightAlign ? 'right' : 'left')};
    transition: transform ${({ theme }) => theme.time} ease-out;
  }

  &:hover {
    cursor: pointer;

    & span:after {
      transform: scaleX(1);
      transform-origin: bottom
        ${({ rightAlign }) => (rightAlign ? 'left' : 'right')};
    }

    & svg {
      color: ${({ theme }) => theme.colorAccent1};
      transform: scale(0.95) translateY(0.1rem);
    }
  }
`;
