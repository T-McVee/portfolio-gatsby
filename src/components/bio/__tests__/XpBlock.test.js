import React from 'react';
import { render, screen } from '@testing-library/react';
import XpBlock from '../XpBlock';

it('renders correctly', () => {
  render(<XpBlock heading="Web development" number="3" />);

  expect(screen.getByRole('heading').textContent).toBe('Web development:');
  expect(screen.getByTestId('number').textContent).toBe('3');
});
