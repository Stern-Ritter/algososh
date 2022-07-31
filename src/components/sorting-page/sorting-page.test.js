import React from "react";
import {
  bubbleSort,
  selectionSort,
  numbersAscending,
  numbersDescending,
} from "./utils";
import { ElementStates } from "../../types/element-states";

const ZERO_DELAY = 0;

describe("Sorting algorithm", () => {
  describe("bubble sort", () => {
    it("sort empty array", async () => {
      const mockSetState = jest.fn();
      const unsortedArray = [];

      await bubbleSort(
        unsortedArray,
        numbersAscending,
        mockSetState,
        ZERO_DELAY
      );
      expect(mockSetState).toBeCalledTimes(0);
    });

    it("sort array of one element", async () => {
      const mockSetState = jest.fn();
      const unsortedArray = [{ index: 0, state: ElementStates.Default }];
      const sortedArray = [{ index: 0, state: ElementStates.Modified }];

      await bubbleSort(
        unsortedArray,
        numbersAscending,
        mockSetState,
        ZERO_DELAY
      );
      expect(mockSetState).toBeCalledTimes(1);
      expect(mockSetState).toHaveBeenLastCalledWith(sortedArray);
    });

    it("sort array ascending", async () => {
      const mockSetState = jest.fn();
      const unsortedArray = [
        { index: 87, state: ElementStates.Default },
        { index: 11, state: ElementStates.Default },
        { index: 0, state: ElementStates.Default },
        { index: 111, state: ElementStates.Default },
        { index: 6, state: ElementStates.Default },
        { index: 1122, state: ElementStates.Default },
      ];
      const sortedArray = [
        { index: 0, state: ElementStates.Modified },
        { index: 6, state: ElementStates.Modified },
        { index: 11, state: ElementStates.Modified },
        { index: 87, state: ElementStates.Modified },
        { index: 111, state: ElementStates.Modified },
        { index: 1122, state: ElementStates.Modified },
      ];

      await bubbleSort(
        unsortedArray,
        numbersAscending,
        mockSetState,
        ZERO_DELAY
      );
      expect(mockSetState).toHaveBeenLastCalledWith(sortedArray);
    });

    it("sort array descending", async () => {
      const mockSetState = jest.fn();
      const unsortedArray = [
        { index: 87, state: ElementStates.Default },
        { index: 11, state: ElementStates.Default },
        { index: 0, state: ElementStates.Default },
        { index: 111, state: ElementStates.Default },
        { index: 6, state: ElementStates.Default },
        { index: 1122, state: ElementStates.Default },
      ];
      const sortedArray = [
        { index: 1122, state: ElementStates.Modified },
        { index: 111, state: ElementStates.Modified },
        { index: 87, state: ElementStates.Modified },
        { index: 11, state: ElementStates.Modified },
        { index: 6, state: ElementStates.Modified },
        { index: 0, state: ElementStates.Modified },
      ];

      await bubbleSort(
        unsortedArray,
        numbersDescending,
        mockSetState,
        ZERO_DELAY
      );
      expect(mockSetState).toHaveBeenLastCalledWith(sortedArray);
    });
  });

  describe("selection sort", () => {
    it("sort empty array", async () => {
      const mockSetState = jest.fn();
      const baseArray = [];

      await selectionSort(
        baseArray,
        numbersAscending,
        mockSetState,
        ZERO_DELAY
      );
      expect(mockSetState).toBeCalledTimes(0);
    });

    it("sort array of one element", async () => {
      const mockSetState = jest.fn();
      const unsortedArray = [{ index: 0, state: ElementStates.Default }];
      const sortedArray = [{ index: 0, state: ElementStates.Modified }];

      await selectionSort(
        unsortedArray,
        numbersAscending,
        mockSetState,
        ZERO_DELAY
      );
      expect(mockSetState).toBeCalledTimes(2);
      expect(mockSetState).toHaveBeenLastCalledWith(sortedArray);
    });

    it("sort array ascending", async () => {
      const mockSetState = jest.fn();
      const unsortedArray = [
        { index: 87, state: ElementStates.Default },
        { index: 11, state: ElementStates.Default },
        { index: 0, state: ElementStates.Default },
        { index: 111, state: ElementStates.Default },
        { index: 6, state: ElementStates.Default },
        { index: 1122, state: ElementStates.Default },
      ];
      const sortedArray = [
        { index: 0, state: ElementStates.Modified },
        { index: 6, state: ElementStates.Modified },
        { index: 11, state: ElementStates.Modified },
        { index: 87, state: ElementStates.Modified },
        { index: 111, state: ElementStates.Modified },
        { index: 1122, state: ElementStates.Modified },
      ];

      await selectionSort(
        unsortedArray,
        numbersAscending,
        mockSetState,
        ZERO_DELAY
      );
      expect(mockSetState).toHaveBeenLastCalledWith(sortedArray);
    });

    it("sort array descending", async () => {
      const mockSetState = jest.fn();
      const unsortedArray = [
        { index: 87, state: ElementStates.Default },
        { index: 11, state: ElementStates.Default },
        { index: 0, state: ElementStates.Default },
        { index: 111, state: ElementStates.Default },
        { index: 6, state: ElementStates.Default },
        { index: 1122, state: ElementStates.Default },
      ];
      const sortedArray = [
        { index: 1122, state: ElementStates.Modified },
        { index: 111, state: ElementStates.Modified },
        { index: 87, state: ElementStates.Modified },
        { index: 11, state: ElementStates.Modified },
        { index: 6, state: ElementStates.Modified },
        { index: 0, state: ElementStates.Modified },
      ];

      await selectionSort(
        unsortedArray,
        numbersDescending,
        mockSetState,
        ZERO_DELAY
      );
      expect(mockSetState).toHaveBeenLastCalledWith(sortedArray);
    });
  });
});
