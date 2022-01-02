import React from 'react';
import styled from 'styled-components';
import Link from './Link';

const Links = (props) => {
  const { links, rightAlign } = props;

  if (!links) return null;
  return (
    <Wrapper rightAlign={rightAlign}>
      {links.map(
        (link) =>
          link.url && (
            <Link
              key={link.text}
              text={link.text}
              href={link.url}
              rightAlign={rightAlign}
              target="blank"
            />
          )
      )}
    </Wrapper>
  );
};

export default Links;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: ${({ rightAlign }) =>
    rightAlign ? 'flex-satr' : 'flex-end'};
  margin: 2rem 0;
  text-align: ${({ rightAlign }) => (rightAlign ? 'left' : 'right')};
`;
