import { render } from '@testing-library/react';
import Ruler from '~components/Ruler';

describe('Ruler', () => {
  it('renders a Ruler component', () => {
    const container = render(<Ruler />);
    expect(container).toMatchSnapshot();
  });

  it('renders a Ruler component with the specified number of segments', async () => {
    const container = render(<Ruler segments={10} />);
    expect(container).toMatchSnapshot();
  });

  it('adds a provided className to the component', async () => {
    const customClassName = 'my-custom-classname';
    render(<Ruler className={customClassName} />);
    expect(document.getElementsByClassName(customClassName)).toHaveLength(1);
  });
});
