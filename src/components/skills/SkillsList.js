import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Skill from './Skill';

const SkillsList = ({ skills }) => {
  if (!skills) return null;

  const settings = {
    //mobileFirst: true,
    responsive: [
      {
        breakpoint: 568,
        settings: {
          autoplay: true,
          autoplaySpeed: 3000,
          speed: 1000,
          centerMode: true,
          centerPadding: '50px',
          infinite: true,
          mobileFirst: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          autoplay: true,
          autoplaySpeed: 3000,
          speed: 1000,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          centerPadding: '70px',
        },
      },
      {
        breakpoint: 1000,
        settings: 'unslick',
      },
      {
        breakpoint: 2000,
        settings: 'unslick',
      },
    ],
  };

  return (
    <Slider {...settings} className="slider">
      {skills.map((skill) => (
        <Skill
          key={skill.id}
          name={skill.name}
          useFa={skill.useFontAwesome}
          icon={skill.faIcon}
          logo={skill.image}
        />
      ))}
    </Slider>
  );
};

export default SkillsList;
