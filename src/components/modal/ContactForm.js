import React from 'react';
import styled from 'styled-components';

const ContactForm = (props) => {
  const { formInfo, handleFormChange, handleFormSubmit } = props;
  const { name, email, phone, message } = formInfo;

  return (
    <Form
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
      data-testid="contact-form"
    >
      <FormControl>
        <Label htmlFor="name">Your name:</Label>
        <Input
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
      </FormControl>
      <FormControl>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="name@email.com"
          value={email}
          onChange={handleFormChange}
          required
        />
        <Alert>Email is required</Alert>
      </FormControl>
      <FormControl>
        <Label htmlFor="phone">Phone:</Label>
        <Input
          type="phone"
          name="phone"
          id="phone"
          placeholder="888-888-8888"
          value={phone}
          onChange={handleFormChange}
        />
      </FormControl>
      <FormControl>
        <Label htmlFor="message">Message:</Label>
        <TextArea
          name="message"
          id="message"
          value={message}
          placeholder="Your message..."
          onChange={handleFormChange}
          required
        />
        <Alert>Message is required</Alert>
      </FormControl>
      <FormControl>
        <Button>Contact</Button>
      </FormControl>
    </Form>
  );
};

export default ContactForm;

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  font-size: 1.2rem;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colorBlack};

  &:focus {
    outline: none;
    border-bottom: 1px solid ${(props) => props.theme.colorAccent1};
  }
`;

const Alert = styled.small`
  display: none;
  opacity: 0;
  color: ${(props) => props.theme.colorAccent2};
  padding-top: 0.25rem;

  &.show {
    opacity: 1;
  }
`;

const TextArea = styled.textarea`
  font-size: 1.2rem;
  height: 8rem;
  font-family: Helvetica, Arial, sans-serif;
  border: none;
  // border-bottom: 1px solid ${(props) => props.theme.colorBlack};
  border-radius: ${(props) => props.theme.radiusSmall};
  background-color: ${(props) => props.theme.colorLightGrey};
  padding: 0.5rem;
  resize: none;

  &:focus {
    outline: 1px solid ${(props) => props.theme.colorAccent1};
  }
`;

const Button = styled.button`
  font-size: 1.2rem;

  color: ${(props) => props.theme.colorWhite};
  background-color: ${(props) => props.theme.colorAccent1};
  padding: 1rem;
  border: none;
  border-radius: ${(props) => props.theme.radiusSmall};

  &:hover {
    cursor: pointer;
    outline: 1px solid black;
  }
`;
