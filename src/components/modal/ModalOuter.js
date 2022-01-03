import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import Icon from '../Icon';

ReactModal.setAppElement('#___gatsby');

const ModalOuter = (props) => {
  const { showModal, modalStyles, handleCloseModal, children } = props;

  return (
    <div>
      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        shouldFocusAfterRender={true}
        preventScroll={true}
        style={modalStyles}
        testId={'modal'}
      >
        <ModalBody>
          <ButtonClose onClick={handleCloseModal}>
            <Icon icon={['fas', 'times']} label="Close" />
          </ButtonClose>
          {children}
        </ModalBody>
      </ReactModal>
    </div>
  );
};

export default ModalOuter;

const ModalBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 11rem);
  margin: 2rem 5.5rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpointTablet}) {
    margin: 1rem 1rem;
    width: calc(100% - 2rem);

    h1 {
      font-size: 2.5rem;
    }
  }
`;

const ButtonClose = styled.div`
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

  span {
    position: absolute;
    height: 1px;
    width: 1px;
    clip: rect(1px, 1px, 1px, 1px);
    overflow: hidden;
  }
`;
