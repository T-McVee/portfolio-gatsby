import React from 'react';
import styled from 'styled-components';
import Tag from './Tag';

const Tags = (props) => {
  const { tags, rightAlign } = props;

  if (!tags) return null;
  return (
    <Wrapper rightAlign={rightAlign} data-testid="tags">
      {tags.map((tag) => (
        <Tag key={tag} text={tag} rightAlign={rightAlign} />
      ))}
    </Wrapper>
  );
};

export default Tags;

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: ${(props) => (props.rightAlign ? 'start' : 'end')};
`;
