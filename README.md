# Counter App test challange

Unit-testing/React exercises developed with Jest + Enzyme, following the the Udemy tutorial from @flyrightsister

## challenge

```jsx
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    counter: 0,
    warning: false
  }

  decrement = () => {
    const { counter } = this.state
    if (counter > 0) {
      this.setState({ counter: counter - 1, warning: false })
    } else {
      this.setState({ warning: true })
    }
  }

  render() {
    const { counter, warning } = this.state
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {counter}</h1>
        <button
          data-test="increment-button"
          onClick={() => this.setState({ counter: counter + 1, warning: false })}>Increment counter</button>
        <button
          data-test="decrement-button"
          onClick={() => this.decrement()}>Decrement counter</button>
        {warning && <p data-test="warning-display">It can not be negative</p>}
      </div>
    );
  }
}

export default App;
```
```jsx
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App Component
 * @function setup
 * @param {object} props - Component props specific for this setup
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
  // => const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state)
  return wrapper;
}

/**
 * Return ShallowWrapper containing node with the given data-test value
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to searth within
 * @param {string} val - Value to data-test attribute for search
 * @returns {ShallowWrapper}
 */

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
}

test('renders without errors', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
})

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
})

test('counter starts at 0', () => {
  const wrapper = setup();
  let initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0)
})

describe('Increment', () => {
  test('renders increment button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'increment-button');
    expect(button.length).toBe(1);
  })

  test('clicking button increments counter display', () => {
    // define the counter at 7
    const counter = 7;
    const wrapper = setup(null, { counter });

    // find button and click
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');
    wrapper.update();

    // find counterdisplay an equal to 8
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1);
  })
})

describe('Decrement', () => {
  test('renders decrement button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'decrement-button');
    expect(button.length).toBe(1);
  })

  test('clicking button decrement counter display', () => {
    // define the counter at 5, for example
    const counter = 5;
    const wrapper = setup(null, { counter });

    // find a button to click
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();

    //find counterdisplay an equal to 4
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter - 1);
  })

  test('error does not show when not needed', () => {
    const wrapper = setup();
    const warningDisplay = findByTestAttr(wrapper, 'warning-display');
    expect(warningDisplay.exists()).toBeFalsy();
  })


  describe('counter is 0', () => {
    let counter;
    let wrapper;
    let counterDisplay;
    beforeEach(() => {
      counter = 0;
      wrapper = setup(null, { counter });
      counterDisplay = findByTestAttr(wrapper, 'counter-display');
    })

    test('clicking button decrement', () => {
      // find a button to click
      const button = findByTestAttr(wrapper, 'decrement-button');
      button.simulate('click');
      wrapper.update();

      //find counterdisplay an equal to 0 and appears a warning message
      const warningDisplay = findByTestAttr(wrapper, 'warning-display');
      expect(wrapper.state().counter).toBeGreaterThanOrEqual(0)
      expect(counterDisplay.text()).toContain(counter);
      expect(warningDisplay.text()).toEqual('It can not be negative');
    })

    test('clicking button increment', () => {
      const warningDisplay = findByTestAttr(wrapper, 'warning-display');
      // find a button to click
      const button = findByTestAttr(wrapper, 'increment-button');
      button.simulate('click');
      wrapper.update();

      //find counterdisplay an equal to 1
      const counterDisplay = findByTestAttr(wrapper, 'counter-display');
      expect(counterDisplay.text()).toContain(counter + 1);
      expect(warningDisplay.exists()).toBeFalsy();
    })
  })
})

```
