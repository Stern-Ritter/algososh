import React from "react";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Component Button", () => {
  it("renders button with text", () => {
    const tree = renderer.create(<Button text="Test button" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders button without text", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders disabled button", () => {
    const tree = renderer.create(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders button with the loading indicator", () => {
    const tree = renderer.create(<Button isLoader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls handler on click", () => {
    const mockHandler = jest.fn();

    render(<Button text="Test button" onClick={mockHandler} />);
    const button = screen.getByText("Test button");

    fireEvent.click(button);
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
