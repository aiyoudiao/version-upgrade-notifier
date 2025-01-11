import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import UseVUN from './useVUN';

describe('UseVUN', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => UseVUN());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
