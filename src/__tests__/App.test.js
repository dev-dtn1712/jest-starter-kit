import { shallow } from 'enzyme';
import React from 'react';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders Title component with Welcome text', () => {
    const wrapper = shallow(<App />);
    const title = wrapper.find('Title');
    expect(title.exists()).toBe(true);
    expect(title.find('p').text()).toBe('Welcome');
  });

  it('renders input element with empty value', () => {
    const wrapper = shallow(<App />);
    const input = wrapper.find('input[type="text"]');
    expect(input.exists()).toBe(true);
    expect(input.props().value).toBe('');
  });

  it('updates input value on change', () => {
    const wrapper = shallow(<App />);
    const input = wrapper.find('input[type="text"]');
    input.simulate('change', { target: { value: 'test' } });
    expect(wrapper.find('input[type="text"]').props().value).toBe('test');
  });

  it('debounces input value after 1 second', () => {
    jest.useFakeTimers();
    const wrapper = shallow(<App />);
    const input = wrapper.find('input[type="text"]');
    input.simulate('change', { target: { value: 'test' } });
    expect(wrapper.find('input[type="text"]').props().value).toBe('test');
    jest.advanceTimersByTime(1000);
    expect(wrapper.find('input[type="text"]').props().value).toBe('test');
    jest.useRealTimers();
  });
});
