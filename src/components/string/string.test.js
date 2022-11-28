import React from "react";
import { ElementStates } from "../../types/element-states";
import { reverseString } from "./utils";

const ZERO_DELAY = 0;

describe("Function reverseString", () => {
  it("reverse string with even number of characters", async () => {
    const mockSetState = jest.fn();
    const baseCharArray = [
      { letter: "c", state: ElementStates.Default },
      { letter: "a", state: ElementStates.Default },
      { letter: "s", state: ElementStates.Default },
      { letter: "e", state: ElementStates.Default },
    ];
    const reversedCharArray = [
      { letter: "e", state: ElementStates.Modified },
      { letter: "s", state: ElementStates.Modified },
      { letter: "a", state: ElementStates.Modified },
      { letter: "c", state: ElementStates.Modified },
    ];

    await reverseString(baseCharArray, mockSetState, ZERO_DELAY);
    expect(mockSetState).toBeCalledTimes(4);
    expect(mockSetState).toHaveBeenLastCalledWith(reversedCharArray);
  });

  it("reverse string with odd number of characters ", async () => {
    const mockSetState = jest.fn();
    const baseCharArray = [
      { letter: "h", state: ElementStates.Default },
      { letter: "e", state: ElementStates.Default },
      { letter: "l", state: ElementStates.Default },
      { letter: "l", state: ElementStates.Default },
      { letter: "o", state: ElementStates.Default },
    ];
    const reversedCharArray = [
      { letter: "o", state: ElementStates.Modified },
      { letter: "l", state: ElementStates.Modified },
      { letter: "l", state: ElementStates.Modified },
      { letter: "e", state: ElementStates.Modified },
      { letter: "h", state: ElementStates.Modified },
    ];

    await reverseString(baseCharArray, mockSetState, ZERO_DELAY);
    expect(mockSetState).toBeCalledTimes(5);
    expect(mockSetState).toHaveBeenLastCalledWith(reversedCharArray);
  });

  it("reverse string with one character", async () => {
    const mockSetState = jest.fn();
    const baseCharArray = [{ letter: "o", state: ElementStates.Default }];
    const reversedCharArray = [{ letter: "o", state: ElementStates.Modified }];

    await reverseString(baseCharArray, mockSetState, ZERO_DELAY);
    expect(mockSetState).toBeCalledTimes(1);
    expect(mockSetState).toHaveBeenLastCalledWith(reversedCharArray);
  });

  it("reverse empty string", async () => {
    const mockSetState = jest.fn();
    const baseCharArray = [];

    await reverseString(baseCharArray, mockSetState, ZERO_DELAY);
    expect(mockSetState).toBeCalledTimes(0);
  });
});
