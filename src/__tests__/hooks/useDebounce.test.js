import { mount } from 'enzyme';
import React, { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { act } from 'react-dom/test-utils';

describe('useDebounce', () => {
  function DebounceTestComponent({ delay }) {
    const [value, setDebounceValue] = useState('');
    const debouncedValue = useDebounce(value, delay);

    return (
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setDebounceValue(e.target.value)}
        />
        <span>{debouncedValue}</span>
      </div>
    );
  }

  it('should update debounced value after delay', (done) => {
    const wrapper = mount(<DebounceTestComponent delay={500} />);
    const input = wrapper.find('input');
    const span = wrapper.find('span');

    expect(span.text()).toBe('');

    act(() => {
      input.simulate('change', { target: { value: 'a' } });
    });

    setTimeout(() => {
      expect(span.text()).toBe('a');
      done();
    }, 500);
  });

  it('should update debounced value with latest value', (done) => {
    const wrapper = mount(<DebounceTestComponent delay={500} />);
    const input = wrapper.find('input');
    const span = wrapper.find('span');

    expect(span.text()).toBe('');

    act(() => {
      input.simulate('change', { target: { value: 'a' } });
    });

    setTimeout(() => {
      expect(span.text()).toBe('a');

      act(() => {
        input.simulate('change', { target: { value: 'b' } });
      });

      setTimeout(() => {
        expect(span.text()).toBe('b');
        done();
      }, 500);
    }, 500);
  });
});
