import { render } from '@testing-library/react';

import VunReactLib from './vun-react-lib';

describe('VunReactLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VunReactLib />);
    expect(baseElement).toBeTruthy();
  });
});
