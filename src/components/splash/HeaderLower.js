import React, { useEffect } from 'react';
import styled from 'styled-components';
// import Rellax from 'rellax';
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'; */

export const HeaderLower = () => {
  useEffect(() => {
    // new Rellax('.rellax', {});
  }, []);

  return (
    <Wrapper className="rellax" data-rellax-speed="2">
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
      <div className="icons">
        <a href="https://github.com/T-McVee" target="blank">
          {/* <FontAwesomeIcon icon={faGithub} className="icon-footer" /> */}
        </a>
        <a href="https://www.linkedin.com/in/t-mcvee/" target="blank">
          {/* <FontAwesomeIcon icon={faLinkedin} className="icon-footer" /> */}
        </a>
        <a href="mailto: iam@tmcvee.com" target="blank">
          {/* <FontAwesomeIcon icon={faEnvelope} className="icon-footer" /> */}
        </a>
      </div>
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

  .icons {
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 3rem;
    height: 67%;
    justify-content: space-around;

    a {
      text-decoration: none;
      color: ${(props) => props.theme.colorBlack};
      transform: translate(50%);
      transition: color ${(props) => props.theme.time};

      &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.colorAccent1};
      }
    }
  }

  @media screen and (max-width: ${(props) => props.theme.breakpointLaptop}) {
    h2 {
      text-shadow: 0px 0px 26px rgba(255, 255, 255, 0.7);
    }

    p {
      text-shadow: 4px 0px 14px rgba(255, 255, 255, 1);
    }
  }
`;
