import React, { useEffect } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Aos from 'aos';
import 'aos/dist/aos.css';
import styled from 'styled-components';
import Description from './Description';

const Project = ({ children, rightAlign }) => {
  const { title, subtitle, description, tags, linkLive, linkRepo, cover } =
    children;

  useEffect(() => {
    Aos.init({
      duration: 2000,
      easing: 'ease',
    });
  }, []);

  const image = getImage(cover);
  const links = [
    { text: 'live', url: linkLive },
    { text: 'repo', url: linkRepo },
  ];

  const openSite = () => {
    window.open(links[0].url);
  };

  const fadeDirection = () => (rightAlign ? 'fade-right' : 'fade-left');

  return (
    <Wrapper
      rightAlign={rightAlign}
      data-testid="project"
      data-aos={fadeDirection()}
    >
      {rightAlign && (
        <GatsbyImage
          className="cover"
          imgClassName="cover-image"
          image={image}
          alt={title}
          onClick={openSite}
          data-testid="cover-image"
        />
      )}
      <Description
        title={title}
        subtitle={subtitle}
        body={description.description}
        links={links}
        tags={tags}
        rightAlign={rightAlign}
      />
      {!rightAlign && (
        <GatsbyImage
          className="cover"
          image={image}
          alt={title}
          onClick={openSite}
          data-testid="cover-image"
        />
      )}
    </Wrapper>
  );
};

export default Project;

const Wrapper = styled.article`
  display: flex;
  flex-direction: row;
  margin-bottom: 12rem;
  margin-left: ${({ rightAlign }) => (rightAlign ? '5.5rem' : '2.5rem')};
  max-width: 1504px;
  width: calc(90% - 5.5rem);

  .cover {
    width: 58%;
    margin: ${({ rightAlign }) => (rightAlign ? '0 2rem 0 0' : '0 0 0 2rem')};
    border-radius: ${({ theme }) => theme.radiusSmall};
    box-shadow: 2px 2px 8px ${({ theme }) => theme.colorGrey};
    transition: box-shadow ${({ theme }) => theme.timeLong},
      transform ${({ theme }) => theme.timeLong} ease-in-out;

    &:hover {
      cursor: pointer;
      box-shadow: 2px 2px 12px ${({ theme }) => theme.colorLightGrey};
      transform: scale(1.01);
    }
  }

  .cover-image {
    // width: 100%;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpointLaptop}) {
    flex-direction: ${({ rightAlign }) =>
      rightAlign ? 'column' : 'column-reverse'};

    margin-left: ${({ rightAlign }) => (rightAlign ? '0' : '2.5rem')};
    float: ${({ rightAlign }) => (rightAlign ? 'left' : 'right')};

    .cover {
      width: 100%;
      margin: 0;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpointPhone}) {
    width: 100%;
  }
`;
