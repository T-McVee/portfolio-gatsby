import React, { useEffect, useState } from 'react';
import ModalOuter from './ModalOuter';
import ContactForm from './ContactForm';
import Thankyou from './Thankyou';
import { theme } from '../layout';

const MIN_DESKTOP_WIDTH = theme.breakpointTablet.slice(0, -2);

const ContactFormModal = (props) => {
  const {
    showModal,
    isSubmited,
    formInfo,
    handleCloseModal,
    handleFormChange,
    handleFormSubmit,
  } = props;

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (typeof window == undefined) return;
    setIsDesktop(window.innerWidth > MIN_DESKTOP_WIDTH);
  }, []);

  useEffect(() => {
    if (typeof window === undefined) return;
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const handleResize = () => {
    if (typeof window === undefined) return;
    setIsDesktop(window.innerWidth > MIN_DESKTOP_WIDTH);
  };

  const postSubmitStyles = () => {
    if (!isSubmited) return isDesktop ? '5rem' : '4rem';
    return isDesktop ? '14.25rem' : '6rem';
  };

  const modalStyles = {
    overlay: {
      zIndex: 10,
      backgroundColor: '#d6d6d65f',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(1px)',
    },
    content: {
      border: 'none',
      maxHeight: '768px',
      borderRadius: '8px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      left: isDesktop ? '5.5rem' : '1rem',
      right: isDesktop ? '5.5rem' : '1rem',
      top: postSubmitStyles(),
      bottom: postSubmitStyles(),
    },
  };

  return (
    <ModalOuter
      showModal={showModal}
      modalStyles={modalStyles}
      handleCloseModal={handleCloseModal}
    >
      {isSubmited ? (
        <Thankyou handleClick={handleCloseModal} />
      ) : (
        <ContactForm
          formInfo={formInfo}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
        />
      )}
    </ModalOuter>
  );
};

export default ContactFormModal;
