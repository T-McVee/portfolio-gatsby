import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import Project from './Project';

export const query = graphql`
  {
    data: allContentfulProject(sort: { fields: order, order: ASC }) {
      nodes {
        id
        title
        subtitle
        description {
          description
        }
        tags
        linkLive
        linkRepo
        order
        cover {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: AUTO
          )
        }
      }
    }
  }
`;

const Projects = () => {
  const { data } = useStaticQuery(query);

  return (
    <Wrapper>
      {data.nodes.map((proj) =>
        proj.order % 2 ? (
          <Project key={proj.id} rightAlign>
            {proj}
          </Project>
        ) : (
          <Project key={proj.id}>{proj}</Project>
        )
      )}
    </Wrapper>
  );
};

export default Projects;

const Wrapper = styled.main`
  width: 100%;
  overflow-x: hidden;
`;
