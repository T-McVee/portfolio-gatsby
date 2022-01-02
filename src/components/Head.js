import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import favicon from '../images/Tmcvee-favicon32.png';

export const query = graphql`
  {
    data: allContentfulSiteMetaData {
      nodes {
        title
        metaTags {
          metaTags {
            name
            property
            content
          }
        }
      }
    }
  }
`;

const Head = () => {
  const {
    data: { nodes },
  } = useStaticQuery(query);
  const {
    title,
    metaTags: { metaTags },
  } = nodes[0];

  return (
    <Helmet
      meta={metaTags}
      title={title}
      link={[{ rel: 'icon', type: 'image/png', sizes: '32x32', href: favicon }]}
    />
  );
};

export default Head;

/* 
[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content:
            "Based in British Columbia, Canada, I'm a Marketing Specialist, turned Front-End Developer. I find the outcomes from applying technology to life's problems fascinating and rewarding. It's what drew me to Web Development and what I inspire to create in each project.",
        },
        {
          property: 'og:url',
          content: 'https://tmcvee.com',
        },
        {
          property: 'og:title',
          content: 'Tim McVinish | Web Developer',
        },
        {
          property: 'og:description',
          content:
            "Based in British Columbia, Canada, I'm a Marketing Specialist, turned Front-End Developer. I find the outcomes from applying technology to life's problems fascinating and rewarding. It's what drew me to Web Development and what I inspire to create in each project.",
        },
        {
          property: 'og:image',
          content: 'https://i.postimg.cc/528Ng2sm/splash-bg.jpg',
        },
      ]
*/

/* 
<meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Based in British Columbia, Canada, I'm a Marketing Specialist, turned Front-End Developer. I find the outcomes from applying technology to life's problems fascinating and rewarding. It's what drew me to Web Development and what I inspire to create in each project."
      />
      <meta property="og:url" content="https://tmcvee.com" />
      <meta property="og:title" content="Tim McVinish | Web Developer" />
      <meta
        property="og:description"
        content="Based in British Columbia, Canada, I'm a Marketing Specialist, turned Front-End Developer. I find the outcomes from applying technology to life's problems fascinating and rewarding. It's what drew me to Web Development and what I inspire to create in each project."
      />
      <meta
        property="og:image"
        content="https://i.postimg.cc/528Ng2sm/splash-bg.jpg"
      />
      <title>Tim McVinish | Web Developer</title>
      <link rel="icon" type="image/png" sizes="32x32" href={favicon} />
*/
