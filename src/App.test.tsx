import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./api/api', () => ({
  post: jest.fn(() =>
    Promise.resolve({
      blob: () =>
        Promise.resolve(new Blob(['Test PDF'], { type: 'application/pdf' })),
    })
  ),
}));

jest.mock('./api/apiUrl', () => ({
  default: {
    createPdf: '/create-pdf',
  },
}));

describe('App component', () => {
  beforeAll(() => {
    globalThis.URL.createObjectURL = jest.fn(
      () => 'blob:http://localhost/fake-pdf-url'
    );
  });
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders text input and convert button', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Введіть текст/i)).toBeInTheDocument();
    expect(screen.getByText(/Конвертувати в PDF/i)).toBeInTheDocument();
  });

  test('shows alert when trying to convert empty text', () => {
    window.alert = jest.fn();
    render(<App />);
    fireEvent.click(screen.getByText(/Конвертувати в PDF/i));
    expect(window.alert).toHaveBeenCalledWith(
      'Будь ласка, введіть текст для конвертації!'
    );
  });

  test('converts text and updates PDF viewer and history', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/Введіть текст/i);
    const button = screen.getByText(/Конвертувати в PDF/i);

    fireEvent.change(input, { target: { value: 'Test text' } });
    fireEvent.click(button);

    expect(screen.getByText(/Конвертація триває.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTitle('PDF Viewer')).toBeInTheDocument();
    });

    await expect(screen.findByText(/№/i)).resolves.toBeInTheDocument();
  });
});
