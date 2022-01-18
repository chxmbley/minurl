import { render, screen } from '@testing-library/react';
import Input from '~components/Input';

test('renders an Input component', () => {
  const { container } = render(<Input />);
  expect(container).toMatchSnapshot();
});

test('adds a provided className to the component', () => {
  const customClassName = 'my-custom-classname';
  const { container } = render(<Input data-testid="input" className={customClassName} />);
  expect(container).toMatchSnapshot();
  expect(screen.getByTestId('input')).toHaveClass(customClassName);
});
