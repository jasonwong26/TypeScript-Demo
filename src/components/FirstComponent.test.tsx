import React from "react";
import expect from "expect";
import { shallow } from "enzyme";

import FirstComponent from "./FirstComponent";

describe("<FirstComponent />", () => {
  it("renders two divs", () => {
    const wrapper = shallow(<FirstComponent />);
    expect(wrapper.find("div").length).toBe(2);
  });

  it("renders the expected header", () => {
    const wrapper = shallow(<FirstComponent />);
    expect(wrapper.find("h1").text()).toEqual("A Simple React Component Example with Typescript");
  });
});
