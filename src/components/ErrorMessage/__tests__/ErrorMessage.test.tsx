import { render } from '@testing-library/react';
import ErrorMessage from '~components/ErrorMessage';

test('renders an ErrorMessage component', () => {
  const { container } = render(<ErrorMessage />);
  expect(container).toMatchSnapshot();
});

test('adds a provided className to the component', () => {
  const customClassName = 'my-custom-classname';
  const { container } = render(<ErrorMessage className={customClassName} />);
  expect(container).toMatchSnapshot();
});

test('renders text content children', () => {
  const { container } = render(<ErrorMessage>Hello world</ErrorMessage>);
  expect(container).toMatchSnapshot();
});

test('renders React component children', () => {
  const { container } = render(
    <ErrorMessage>
      <strong>Hello world</strong>
    </ErrorMessage>,
  );

  expect(container).toMatchSnapshot();
});

test('overrides the default title when a title prop is provided', () => {
  const { container } = render(<ErrorMessage title="Test" />);
  expect(container).toMatchSnapshot();
});
