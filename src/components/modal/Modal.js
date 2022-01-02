import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ContactForm from './ContactForm';

const root = document.getElementsByClassName('App');
ReactModal.setAppElement(root);

const Modal = (props) => {
  const {
    showModal,
    handleFormChange,
    handleFormSubmit,
    isSubmited,
    formInfo,
    handleCloseModal,
  } = props;

  // Can the 768 come from props?
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const handleResize = () => {
    setIsDesktop(window.innerWidth > 768);
  };

  const postSubmitStyles = () => {
    if (!isSubmited) return isDesktop ? '5rem' : '4rem';
    return isDesktop ? '16rem' : '6rem';
  };

  const ModalStyles = {
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
    <div>
      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        shouldFocusAfterRender={true}
        preventScroll={true}
        style={ModalStyles}
        testId={'modal'}
      >
        <ModalBody>
          <ButtonClose onClick={handleCloseModal}>
            <FontAwesomeIcon icon={faTimes} />
          </ButtonClose>
          <h1>{isSubmited ? 'Cheers!' : 'Get in contact'}</h1>
          {isSubmited ? (
            <div className="message">
              <span>🍻</span>
              <p>Your request has been received.</p>
              <p>We'll contact you shortly.</p>
              <Button onClick={handleCloseModal}>Close</Button>
            </div>
          ) : (
            <ContactForm
              formInfo={formInfo}
              handleFormChange={handleFormChange}
              handleFormSubmit={handleFormSubmit}
            />
          )}
        </ModalBody>
      </ReactModal>
    </div>
  );
};

export default Modal;

const ModalBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 11rem);
  margin: 2rem 5.5rem;

  h1 {
    font-size: 3rem;
    width: 100%;
    margin-bottom: 2rem;
    padding-right: 2rem;
  }

  .message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    p {
      font-size: 1.6rem;
      margin-bottom: 0.5rem;
    }

    span {
      font-size: 4rem;
      margin-left: 0.5rem;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpointTablet}) {
    margin: 1rem 1rem;
    width: calc(100% - 2rem);

    h1 {
      font-size: 2.5rem;
    }
  }
`;

const ButtonClose = styled.button`
  position: absolute;
  right: 0;
  font-size: 1.4rem;
  background-color: transparent;
  border: none;
  transition: color ${({ theme }) => theme.time},
    transform ${({ theme }) => theme.time};

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colorAccent1};
    transform: scale(1.1);
  }
`;

const Button = styled.button`
  font-size: 1.2rem;

  color: ${({ theme }) => theme.colorWhite};
  background-color: ${({ theme }) => theme.colorAccent1};
  padding: 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.radiusSmall};
  margin-top: 0.5rem;

  &:hover {
    cursor: pointer;
    outline: 1px solid black;
  }
`;
