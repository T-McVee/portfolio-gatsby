import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Project from '../Project';

beforeEach(cleanup);

const fakeProject = {
  title: 'List Lab',
  subtitle: 'A tribute to Trello',
  description: {
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum soluta aut rem enim architecto natus magnam ex doloribus? Nesciunt impedit error necessitatibus, dicta tenetur ad veniam recusandae molestiae vero obcaecati.',
  },
  tags: ['javascript', 'sass', 'firebase auth', "drag n' drop", 'indexedDB'],
  linkLive: 'https://fakelive.com',
  linkRepo: 'https://fakereop.com',
  cover: {
    gatsbyImageData: {
      images: {
        sources: [],
        fallback: {
          src: 'https://images.ctfassets.net/rki59qrc3s7p/239Q0O44lMSb2DMwabUlxs/c8e30fcbc82e3e7ef0f3b4c14fff4575/coverListLab-2.jpg?w=2222&h=1254&fl=progressive&q=50&fm=jpg',
          srcSet:
            'https://images.ctfassets.net/rki59qrc3s7p/239Q0O44lMSb2DMwabUlxs/c8e30fcbc82e3e7ef0f3b4c14fff4575/coverListLab-2.jpg?w=556&h=314&fl=progressive&q=50&fm=jpg 556w,\nhttps://images.ctfassets.net/rki59qrc3s7p/239Q0O44lMSb2DMwabUlxs/c8e30fcbc82e3e7ef0f3b4c14fff4575/coverListLab-2.jpg?w=1111&h=627&fl=progressive&q=50&fm=jpg 1111w,\nhttps://images.ctfassets.net/rki59qrc3s7p/239Q0O44lMSb2DMwabUlxs/c8e30fcbc82e3e7ef0f3b4c14fff4575/coverListLab-2.jpg?w=2222&h=1254&fl=progressive&q=50&fm=jpg 2222w',
          sizes: '(min-width: 2222px) 2222px, 100vw',
        },
      },
    },
  },
};

// create array of links who's value is not undefined
const links = [];
for (let key of Object.keys(fakeProject)) {
  const pattern = /link/gi;
  if (pattern.test(key) && fakeProject[key]) links.push(fakeProject[key]);
}

it('<Project>', () => {
  render(<Project>{fakeProject}</Project>);

  const { title, subtitle, description, tags } = fakeProject;

  expect(screen.getByTestId('cover-image')).toBeDefined();
  expect(screen.getByRole('heading').textContent).toBe(title);
  expect(screen.getByTestId('subtitle').textContent).toBe(subtitle);
  expect(screen.getByTestId('body').textContent).toBe(description.description);
  expect(screen.getAllByRole('link').length).toBe(links.length);
  expect(screen.queryAllByTestId('tag').length).toBe(tags.length);
});
