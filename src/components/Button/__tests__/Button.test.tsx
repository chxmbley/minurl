import { render } from '@testing-library/react';
import Button from '~components/Button';

test('renders a Button component', () => {
  const container = render(<Button />);
  expect(container).toMatchSnapshot();
});

test('renders a Button component with text children', () => {
  const container = render(<Button>Hello world!</Button>);
  expect(container).toMatchSnapshot();
});

test('renders a Button component with React node children', () => {
  const container = render(
    <Button>
      Hello <span className="text-red-500">world!</span>
    </Button>,
  );

  expect(container).toMatchSnapshot();
});

test('adds a provided className to the component', () => {
  const customClassName = 'my-custom-classname';
  const container = render(<Button data-testid="button" className={customClassName} />);
  expect(container).toMatchSnapshot();
  expect(container.getByTestId('button')).toHaveClass(customClassName);
});
