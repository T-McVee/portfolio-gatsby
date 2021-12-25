import React from 'react';
import styled from 'styled-components';

export const ButtonCta = (props) => {
  const { text, handleClick } = props;

  return <Button onClick={handleClick}>{text}</Button>;
};

export default ButtonCta;

const Button = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => props.theme.colorBlack};
  border-radius: ${(props) => props.theme.radiusSmall};
  transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  font-size: 19px;
  color: black;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    right: 100%;
    transform: translateX(-25%) scaleY(1) scaleX(1.25);
    top: 0%;
    width: 140%;
    height: 180%;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }

  &:after {
    content: '';
    position: absolute;
    right: 105%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 25%;
    width: 160%;
    height: 190%;
    background-color: ${(props) => props.theme.colorAccent1};
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }

  &:hover {
    color: ${(props) => props.theme.colorWhite};
    border: 1px solid ${(props) => props.theme.colorAccent1};
    cursor: pointer;
  }

  &:hover:before {
    right: -105%;
    background-color: ${(props) => props.theme.colorAccent1};
    transform: translateX(-50%) scaleY(1.4) scaleX(1.3);
  }

  &:hover:after {
    right: -100%;
    background-color: ${(props) => props.theme.colorAccent1};
    transform: translateX(-50%) scaleY(1.4) scaleX(1.3);
  }
`;
