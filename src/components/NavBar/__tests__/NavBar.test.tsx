import { render } from '@testing-library/react';
import NavBar from '~components/NavBar';

describe('NavBar', () => {
  it('renders a NavBar component', () => {
    const container = render(<NavBar />);
    expect(container).toMatchSnapshot();
  });
});
