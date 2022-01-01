import React from 'react';
import Skill from '../Skill';
import { render, screen, cleanup } from '@testing-library/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHtml5 } from '@fortawesome/free-brands-svg-icons';

beforeAll(() => {
  library.add(faHtml5);
});

beforeEach(cleanup);

const fakeSkillOne = {
  useFontAwesome: true,
  faIcon: {
    library: 'fab',
    icon: 'html5',
  },
  id: '493c5e13-8fef-510c-9fb1-2d178fe2c7fa',
  image: null,
  name: 'HTML ',
};

const fakeSkillTwo = {
  useFontAwesome: false,
  faIcon: null,
  id: '',
  image: {
    gatsbyImageData: {
      images: {
        sources: [
          {
            srcSet:
              'https://images.ctfassets.net/rki59qrc3s7p/5Od5QZ7vcIZl7AequNkDYk/2ef0abd02353db6b782e3aba28f06d63/logoWebpack.png?w=192&h=213&q=50&fm=webp 192w,\nhttps://images.ctfassets.net/rki59qrc3s7p/5Od5QZ7vcIZl7AequNkDYk/2ef0abd02353db6b782e3aba28f06d63/logoWebpack.png?w=384&h=425&q=50&fm=webp 384w,\nhttps://images.ctfassets.net/rki59qrc3s7p/5Od5QZ7vcIZl7AequNkDYk/2ef0abd02353db6b782e3aba28f06d63/logoWebpack.png?w=768&h=850&q=50&fm=webp 768w',
            sizes: '(min-width: 768px) 768px, 100vw',
            type: 'image/webp',
          },
        ],
        fallback: {
          src: 'https://images.ctfassets.net/rki59qrc3s7p/5Od5QZ7vcIZl7AequNkDYk/2ef0abd02353db6b782e3aba28f06d63/logoWebpack.png?w=768&h=850&q=50&fm=png',
          srcSet:
            'https://images.ctfassets.net/rki59qrc3s7p/5Od5QZ7vcIZl7AequNkDYk/2ef0abd02353db6b782e3aba28f06d63/logoWebpack.png?w=192&h=213&q=50&fm=png 192w,\nhttps://images.ctfassets.net/rki59qrc3s7p/5Od5QZ7vcIZl7AequNkDYk/2ef0abd02353db6b782e3aba28f06d63/logoWebpack.png?w=384&h=425&q=50&fm=png 384w,\nhttps://images.ctfassets.net/rki59qrc3s7p/5Od5QZ7vcIZl7AequNkDYk/2ef0abd02353db6b782e3aba28f06d63/logoWebpack.png?w=768&h=850&q=50&fm=png 768w',
          sizes: '(min-width: 768px) 768px, 100vw',
        },
      },
      layout: 'constrained',
      width: 768,
      height: 850,
      placeholder: {
        fallback:
          "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='400'%20height='443'%20viewBox='0%200%20400%20443'%20preserveAspectRatio='none'%3e%3cpath%20d='M186%204A8023%208023%200%200111%20104l9%207%2052%2029c2%201-3%204%2081-42l35-20%204-2V39c0-41%200-39-6-35m23%200c-2%201-1%2072%200%2073a1565%201565%200%200095%2052c21%2011%2022%2012%2025%2011a2136%202136%200%200061-36l-37-21a6021%206021%200%2001-103-59C213%203%20210%202%20209%204m-21%2093a17203%2017203%200%2001-96%2054c-1%201-5-1%2049%2029l45%2027%2014%208%2015-9a16034%2016034%200%200194-54l-44-26a15308%2015308%200%2001-65-35l-12%206m209%2023a4069%204069%200%2001-60%2035l-3%202v68l1%2067%2020%2012a8778%208778%200%200144%2025%206032%206032%200%2000-2-209M1%20225l1%20104%2024-13%2031-19%209-5v-67c0-63%200-68-2-69L2%20120%201%20225m81%201l1%2059%2039%2022a27856%2027856%200%200169%2038l1-58v-58l-25-15a7451%207451%200%2000-84-48l-1%2060m216-49a3290%203290%200%2001-65%2038l-25%2014v57l1%2058%2024-12%2054-29%2031-18v-59l-1-60-19%2011M78%20304l-29%2017c-34%2020-35%2020-33%2022a1045%201045%200%200089%2050%203938%203938%200%200087%2049%20978%20978%200%2000-2-78%20837%20837%200%2000-70-40%20407%20407%200%2000-32-17c-9-4-8-4-10-3m230%206a6111%206111%200%2000-96%2053l-4%202v39l1%2038a2766%202766%200%200084-47%205503%205503%200%200192-53l-8-6-57-33-12%207'%20fill='%23d3d3d3'%20fill-rule='evenodd'/%3e%3c/svg%3e",
      },
    },
  },
  name: 'Webpack',
};

it('<Skill> with FontAwesome icon', () => {
  render(
    <Skill
      name={fakeSkillOne.name}
      icon={fakeSkillOne.faIcon}
      useFa={fakeSkillOne.useFontAwesome}
    />
  );

  expect(screen.getByRole('heading').textContent).toBe(fakeSkillOne.name);
  expect(screen.getByTestId('logo').getAttribute('data-icon')).toBe('html5');
});

it('<Skill> with image', () => {
  render(
    <Skill
      name={fakeSkillTwo.name}
      logo={fakeSkillTwo.image}
      useFa={fakeSkillTwo.useFontAwesome}
    />
  );

  expect(screen.getByRole('heading').textContent).toBe(fakeSkillTwo.name);
  expect(screen.getByTestId('logo')).toBeDefined();
});
