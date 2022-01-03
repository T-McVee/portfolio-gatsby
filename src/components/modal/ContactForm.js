import React from 'react';
import styled from 'styled-components';

const ContactForm = (props) => {
  const { formInfo, handleFormChange, handleFormSubmit } = props;
  const { name, email, phone, message } = formInfo;

  return (
    <Wrapper
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
      data-testid="contact-form"
    >
      <div className="form-control">
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          value={name}
          onChange={handleFormChange}
          autoFocus
          required
        />
        <Alert>Name is required</Alert>
      </div>
      <div className="form-control">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="name@email.com"
          value={email}
          onChange={handleFormChange}
          required
        />
        <Alert>Email is required</Alert>
      </div>
      <div className="form-control">
        <label htmlFor="phone">Phone:</label>
        <input
          type="phone"
          name="phone"
          id="phone"
          placeholder="888-888-8888"
          value={phone}
          onChange={handleFormChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="message">Message:</label>
        <textarea
          name="message"
          id="message"
          value={message}
          placeholder="Your message..."
          onChange={handleFormChange}
          required
        />
        <Alert>Message is required</Alert>
      </div>
      <div className="form-control">
        <button>Contact</button>
      </div>
    </Wrapper>
  );
};

export default ContactForm;

const Wrapper = styled.form`
  width: 100%;
  height: 100%;

  .form-control {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }

  label {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  input {
    font-size: 1.2rem;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colorBlack};

    &:focus {
      outline: none;
      border-bottom: 1px solid ${({ theme }) => theme.colorAccent1};
    }
  }

  textarea {
    font-size: 1.2rem;
    height: 8rem;
    font-family: Helvetica, Arial, sans-serif;
    border: none;
    border-radius: ${({ theme }) => theme.radiusSmall};
    background-color: ${({ theme }) => theme.colorLightGrey};
    padding: 0.5rem;
    resize: none;

    &:focus {
      outline: 1px solid ${({ theme }) => theme.colorAccent1};
    }
  }

  button {
    font-size: 1.2rem;

    color: ${({ theme }) => theme.colorWhite};
    background-color: ${({ theme }) => theme.colorAccent1};
    padding: 1rem;
    border: none;
    border-radius: ${({ theme }) => theme.radiusSmall};

    &:hover {
      cursor: pointer;
      outline: 1px solid black;
    }
  }
`;

const Alert = styled.small`
  display: none;
  opacity: 0;
  color: ${({ theme }) => theme.colorAccent2};
  padding-top: 0.25rem;

  &.show {
    opacity: 1;
  }
`;
