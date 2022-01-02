import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <span>Tim's {node.type}</span>
          <FontAwesomeIcon
            icon={[node.faIcon.library, node.faIcon.icon]}
            className={iconClass}
          />
        </a>
      ))}
    </Wrapper>
  );
};

export default SocialIcons;

const Wrapper = styled.div``;
