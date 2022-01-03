import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = (props) => {
  const { label, icon, iconClass } = props;
  return (
    <>
      <span>{label}</span>
      <FontAwesomeIcon icon={icon} className={iconClass} />
    </>
  );
};

export default Icon;
