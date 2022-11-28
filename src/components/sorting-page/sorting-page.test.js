import React from "react";
import {
  bubbleSort,
  selectionSort,
  numbersAscending,
  numbersDescending,
} from "./utils";
import { ElementStates } from "../../types/element-states";

const ZERO_DELAY = 0;

let emptyArray;
let oneElementUnsortedArray;
let oneElementSortedArray;
let unsortedArray;
let ascendingSortedArray;
let descendingSortedArray;

describe("Sorting algorithm", () => {
  beforeEach(() => {
    emptyArray = [];
    oneElementUnsortedArray = [{ index: 0, state: ElementStates.Default }];
    oneElementSortedArray = [{ index: 0, state: ElementStates.Modified }];
    unsortedArray = [
      { index: 87, state: ElementStates.Default },
      { index: 11, state: ElementStates.Default },
      { index: 0, state: ElementStates.Default },
      { index: 111, state: ElementStates.Default },
      { index: 6, state: ElementStates.Default },
      { index: 1122, state: ElementStates.Default },
    ];
    ascendingSortedArray = [
      { index: 0, state: ElementStates.Modified },
      { index: 6, state: ElementStates.Modified },
      { index: 11, state: ElementStates.Modified },
      { index: 87, state: ElementStates.Modified },
      { index: 111, state: ElementStates.Modified },
      { index: 1122, state: ElementStates.Modified },
    ];
    descendingSortedArray = [
      { index: 1122, state: ElementStates.Modified },
      { index: 111, state: ElementStates.Modified },
      { index: 87, state: ElementStates.Modified },
      { index: 11, state: ElementStates.Modified },
      { index: 6, state: ElementStates.Modified },
      { index: 0, state: ElementStates.Modified },
    ];
  });

  describe("bubble sort", () => {
    it("sort empty array", async () => {
      const mockSetState = jest.fn();

      await bubbleSort(emptyArray, numbersAscending, mockSetState, ZERO_DELAY);
      expect(mockSetState).toBeCalledTimes(0);
    });

    it("sort array of one element", async () => {
      const mockSetState = jest.fn();

      await bubbleSort(
        oneElementUnsortedArray,
        numbersAscending,
        mockSetState,
        ZERO_DELAY
      );
      expect(mockSetState).toBeCalledTimes(1);
      expect(mockSetState).toHaveBeenLastCalledWith(oneElementSortedArray);
    });

    it("sort array ascending", async () => {
      const mockSetState = jest.fn();

      await bubbleSort(
        unsortedArray,
        numbersAscending,
        mockSetState,
        ZERO_DELAY
      );
      expect(mockSetState).toHaveBeenLastCalledWith(ascendingSortedArray);
    });

    it("sort array descending", async () => {
      const mockSetState = jest.fn();

      await bubbleSort(
        unsortedArray,
        numbersDescending,
        mockSetState,
        ZERO_DELAY
      );
      expect(mockSetState).toHaveBeenLastCalledWith(descendingSortedArray);
    });
  });

  describe("selection sort", () => {
    it("sort empty array", async () => {
      const mockSetState = jest.fn();

      await selectionSort(
        emptyArray,
        numbersAscending,
        mockSetState,
        ZERO_DELAY
      );
      expect(mockSetState).toBeCalledTimes(0);
    });

    it("sort array of one element", async () => {
      const mockSetState = jest.fn();

      await selectionSort(
        oneElementUnsortedArray,
        numbersAscending,
        mockSetState,
        ZERO_DELAY
      );
      expect(mockSetState).toBeCalledTimes(2);
      expect(mockSetState).toHaveBeenLastCalledWith(oneElementSortedArray);
    });

    it("sort array ascending", async () => {
      const mockSetState = jest.fn();

      await selectionSort(
        unsortedArray,
        numbersAscending,
        mockSetState,
        ZERO_DELAY
      );
      expect(mockSetState).toHaveBeenLastCalledWith(ascendingSortedArray);
    });

    it("sort array descending", async () => {
      const mockSetState = jest.fn();

      await selectionSort(
        unsortedArray,
        numbersDescending,
        mockSetState,
        ZERO_DELAY
      );
      expect(mockSetState).toHaveBeenLastCalledWith(descendingSortedArray);
    });
  });
});
