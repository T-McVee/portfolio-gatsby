module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "portfolio",
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: "40gC4wGv9xVyA_taCKCP3rKaVkhT7UevAlfjKhwQWiE",
        spaceId: "rki59qrc3s7p",
      },
    },
    "gatsby-plugin-styled-components",
  ],
};
