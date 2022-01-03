import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';
import { graphql, useStaticQuery } from 'gatsby';

export const query = graphql`
  {
    data: allContentfulContactMethod(
      limit: 3
      sort: { fields: order, order: ASC }
    ) {
      nodes {
        id
        address
        type
        faIcon {
          library
          icon
        }
      }
    }
  }
`;

const SocialIcons = (props) => {
  const { wrapperClass, iconClass } = props;

  const {
    data: { nodes },
  } = useStaticQuery(query);

  return (
    <Wrapper className={wrapperClass}>
      {nodes.map((node) => (
        <a href={node.address} target="blank" key={node.id}>
          <Icon
            icon={[node.faIcon.library, node.faIcon.icon]}
            label={`Tim's ${node.type}`}
            iconClass={iconClass}
          />
        </a>
      ))}
    </Wrapper>
  );
};

export default SocialIcons;

const Wrapper = styled.div``;
