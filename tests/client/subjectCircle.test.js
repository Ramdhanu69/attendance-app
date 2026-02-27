/**
 * Minimal test for SubjectCircle component using React Testing Library.
 * This file assumes Jest is configured to handle JSX via babel-jest.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubjectCircle from '../../src/components/SubjectCircle';

describe('SubjectCircle', () => {
  it('renders name, counts, and percentage correctly', () => {
    const subject = { id: 's1', name: 'Math', attended: 3, total: 4 };
    render(<SubjectCircle subject={subject} onClick={() => {}} />);
    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('3/4')).toBeInTheDocument();
    expect(screen.getByText('75.0%')).toBeInTheDocument();
  });
});
