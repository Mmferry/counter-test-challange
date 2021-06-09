import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });
/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

describe("Test conuter app", () => {
  let wrapper = setup();

  test("renders without error", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.length).toBe(1);
  });

  describe("Increment", () => {
    test("renders increment button", () => {
      const button = findByTestAttr(wrapper, "increment-button");
      expect(button.length).toBe(1);
    });

    test("renders counter display", () => {
      const counterDisplay = findByTestAttr(wrapper, "counter-display");
      expect(counterDisplay.length).toBe(1);
    });

    test("counters starts at 0", () => {
      const initialCounterState = wrapper.state("counter");
      expect(initialCounterState).toBe(0);
    });

    test("clicking button increments counter display", () => {
      const counter = 7;
      wrapper = setup(null, { counter });
      // find button and click
      const button = findByTestAttr(wrapper, "increment-button");
      button.simulate("click");
      wrapper.update();

      // find display and test value
      const counterDisplay = findByTestAttr(wrapper, "counter-display");
      expect(counterDisplay.text()).toContain(counter + 1);
    });
  });

  describe("Decrement", () => {
    test("renders decrement button", () => {
      const button = findByTestAttr(wrapper, "decrement-button");
      expect(button.length).toBe(1);
    });

    test("clicking button decrements counter display", () => {
      const counter = 7;
      wrapper = setup(null, { counter });
      // find button and click
      const button = findByTestAttr(wrapper, "decrement-button");
      button.simulate("click");
      wrapper.update();

      // find display and test value
      const counterDisplay = findByTestAttr(wrapper, "counter-display");
      expect(counterDisplay.text()).toContain(counter - 1);
    });

    test("error does not show when not needed", () => {
      const warningDisplay = findByTestAttr(wrapper, "warning-display");
      expect(warningDisplay.exists()).toBeFalsy();
    });

  });

  describe('counter is 0', () => {
    let counter;
    let counterDisplay;
    beforeEach(() => {
      counter = 0;
      wrapper = setup(null, { counter });
      counterDisplay = findByTestAttr(wrapper, 'counter-display');
    });

    test("clicking button decrement", () => {
      // find button and click
      const button = findByTestAttr(wrapper, "decrement-button");
      button.simulate("click");
      wrapper.update();

      //find counterdisplay an equal to 0 and appears a warning message
      const warningDisplay = findByTestAttr(wrapper, "warning-display");
      expect(wrapper.state().counter).toBeGreaterThanOrEqual(0);
      expect(counterDisplay.text()).toContain(counter);
      expect(warningDisplay.text()).toEqual("It can not be negative");
    });

    test("clicking button increment", () => {
      // find button and click
      const button = findByTestAttr(wrapper, "increment-button");
      button.simulate("click");
      wrapper.update();

      //find counterdisplay an equal to 1
      expect(counterDisplay.text()).toContain(counter);
      const warningDisplay = findByTestAttr(wrapper, "warning-display");
      expect(warningDisplay.exists()).toBeFalsy();
    });
  });
});
