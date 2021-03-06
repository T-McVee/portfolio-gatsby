import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import SkillsList from './SkillsList';
import H1 from '../H1';

export const query = graphql`
  {
    data: allContentfulSkill(sort: { fields: order, order: ASC }) {
      nodes {
        useFontAwesome
        faIcon {
          library
          icon
        }
        id
        image {
          gatsbyImageData(placeholder: TRACED_SVG, layout: CONSTRAINED)
        }
        name
      }
    }
  }
`;

export const PureSkills = ({ data }) => {
  if (!data) return null;
  return (
    <Wrapper data-testid="skills">
      <H1>Skills</H1>
      <SkillsList skills={data} />
      <hr className="divide" />
    </Wrapper>
  );
};

const Skills = () => {
  const {
    data: { nodes },
  } = useStaticQuery(query);

  return <PureSkills data={nodes} />;
};

export default Skills;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12rem 5.5rem 12rem 5.5rem;
  background-color: ${({ theme }) => theme.colorLightGrey};
  color: ${({ theme }) => theme.colorBlack};

  .divide {
    margin-top: 14rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpointTablet}) {
    padding: 4rem;

    h1 {
      font-size: 3rem;
    }

    .divide {
      margin-top: 4rem;
    }
  }
`;
