import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MinifierForm from '~components/MinifierForm';
import * as urlUtils from '~lib/utils/url';
import { constructMiniUrlFromSlug } from '~lib/utils/url';
import { expect } from '@jest/globals';
import { APP_BASE_URL, OUTPUT_URL_MESSAGES } from '~lib/constants';
import { URL_FIELD_NAME } from '~components/MinifierForm/constants';

test('renders a MinifierForm component', () => {
  const { container } = render(<MinifierForm onReset={jest.fn()} onSubmit={jest.fn()} slug={null} />);
  expect(container).toMatchSnapshot();
});

test('calls "onSubmit" when the form is submitted', async () => {
  const inputUrl = 'https://google.com';
  const mockOnSubmit = jest.fn();
  const mockOnReset = jest.fn();

  render(<MinifierForm onReset={mockOnReset} onSubmit={mockOnSubmit} slug={null} />);

  const input = screen.getByPlaceholderText('paste a url');
  const submit = screen.getByTestId('minifier-form-submit');
  const message = screen.getByTestId('minifier-form-message');

  expect(input).toBeInTheDocument();
  expect(input).not.toBeDisabled();
  expect(input).not.toHaveAttribute('readonly');

  expect(submit).toBeInTheDocument();
  expect(submit).toBeDisabled();
  expect(submit).toHaveAttribute('title', 'Submit');

  expect(message.textContent).toBe('');

  await act(async () => {
    await userEvent.type(input, inputUrl);
  });

  expect(input).toHaveValue(inputUrl);
  expect(submit).not.toBeDisabled();

  await act(async () => {
    await userEvent.click(submit);
  });

  expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  expect(mockOnSubmit).toHaveBeenCalledWith({ [URL_FIELD_NAME]: inputUrl });
  expect(mockOnReset).not.toHaveBeenCalled();
});

test('calls "onReset" when the form is submitted when a slug is present', async () => {
  const slug = 'mockslug';
  const mockMiniUrl = 'http://localhost/abc123';
  const constructMiniUrlFromSlugSpy = jest.spyOn(urlUtils, 'constructMiniUrlFromSlug').mockReturnValue(mockMiniUrl);

  const mockOnSubmit = jest.fn();
  const mockOnReset = jest.fn();

  render(<MinifierForm onReset={mockOnReset} onSubmit={mockOnSubmit} slug={slug} />);

  const input = screen.getByPlaceholderText('paste a url');
  const submit = screen.getByTestId('minifier-form-submit');
  const copy = screen.getByTestId('minifier-form-copy');
  const message = screen.getByTestId('minifier-form-message');

  expect(input).toBeInTheDocument();
  expect(input).not.toBeDisabled();
  expect(input).toHaveAttribute('readonly');
  expect(input).toHaveValue(mockMiniUrl);

  expect(copy).toBeInTheDocument();

  expect(submit).toBeInTheDocument();
  expect(submit).not.toBeDisabled();
  expect(submit).toHaveAttribute('title', 'Reset');

  expect(OUTPUT_URL_MESSAGES).toContain(message.textContent);
  expect(constructMiniUrlFromSlugSpy).toHaveBeenCalledTimes(1);

  await act(async () => {
    await userEvent.click(submit);
  });

  expect(mockOnReset).toHaveBeenCalledTimes(1);
  expect(mockOnSubmit).not.toHaveBeenCalled();
  expect(message.textContent).toBe('');
});

test('prevents submit when URL is invalid', async () => {
  const inputUrl = 'https:google.com';
  const mockOnSubmit = jest.fn();
  const mockOnReset = jest.fn();

  render(<MinifierForm onReset={mockOnReset} onSubmit={mockOnSubmit} slug={null} />);

  const input = screen.getByPlaceholderText('paste a url');
  const submit = screen.getByTestId('minifier-form-submit');

  await act(async () => {
    await userEvent.type(input, inputUrl);
    await userEvent.click(submit);
  });

  expect(mockOnSubmit).not.toHaveBeenCalled();
  expect(mockOnReset).not.toHaveBeenCalled();
});

test('prevents submit when URL is formatted as a shortened URL', async () => {
  const inputUrl = `${APP_BASE_URL}/abc123`;
  const mockOnSubmit = jest.fn();
  const mockOnReset = jest.fn();

  render(<MinifierForm onReset={mockOnReset} onSubmit={mockOnSubmit} slug={null} />);

  const input = screen.getByPlaceholderText('paste a url');
  const submit = screen.getByTestId('minifier-form-submit');

  await act(async () => {
    await userEvent.type(input, inputUrl);
    await userEvent.click(submit);
  });

  expect(mockOnSubmit).not.toHaveBeenCalled();
  expect(mockOnReset).not.toHaveBeenCalled();
});
