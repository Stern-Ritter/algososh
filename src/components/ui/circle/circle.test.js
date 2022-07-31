import React from "react";
import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Component Circle", () => {
  it("renders element without letter", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders element with letter", () => {
    const tree = renderer.create(<Circle letter="A" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders element with string in head", () => {
    const tree = renderer.create(<Circle head="head" />);
    expect(tree).toMatchSnapshot();
  });

  it("renders element with react-element in head", () => {
    const tree = renderer.create(
      <Circle head={<Circle letter="head react element" />} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders element with string in tail", () => {
    const tree = renderer.create(<Circle tail="tail" />);
    expect(tree).toMatchSnapshot();
  });

  it("renders element with react-element in tail", () => {
    const tree = renderer.create(
      <Circle tail={<Circle letter="tail react element" />} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders element with value in index", () => {
    const tree = renderer.create(<Circle index={0} />);
    expect(tree).toMatchSnapshot();
  });

  it("renders element with isSmall props", () => {
    const tree = renderer.create(<Circle isSmall />);
    expect(tree).toMatchSnapshot();
  });

  it("renders element with default state", () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />);
    expect(tree).toMatchSnapshot();
  });

  it("renders element with changing state", () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />);
    expect(tree).toMatchSnapshot();
  });

  it("renders element with modified state", () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />);
    expect(tree).toMatchSnapshot();
  });
});
