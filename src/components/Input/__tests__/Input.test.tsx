import { render } from '@testing-library/react';
import Input from '~components/Input';

describe('Input', () => {
  it('renders an Input component', () => {
    const container = render(<Input />);
    expect(container).toMatchSnapshot();
  });

  it('adds a provided className to the component', () => {
    const customClassName = 'my-custom-classname';
    const container = render(<Input data-testid="input" className={customClassName} />);
    expect(container).toMatchSnapshot();
    expect(container.getByTestId('input')).toHaveClass(customClassName);
  });
});
