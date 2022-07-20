import { Dispatch, SetStateAction } from "react";
import { sleep } from "../../utils/utils";
import { swap } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { ArrayElement } from "../../types/array-element";

const bubbleSort = async (
  array: ArrayElement[],
  compare: (first: number, second: number) => boolean,
  setState: Dispatch<SetStateAction<ArrayElement[]>>,
  delay: number
) => {
  const tempArray = [...array];
  const { length } = tempArray;

  for (let i = 0; i < length; i += 1) {
    for (let j = 0; j < length - 1 - i; j++) {
      tempArray[j].state = ElementStates.Changing;
      tempArray[j + 1].state = ElementStates.Changing;
      setState([...tempArray]);

      await sleep(delay / 2);
      if (compare(tempArray[j].index, tempArray[j + 1].index)) {
        swap(tempArray, j, j + 1);
        setState([...tempArray]);
      }

      await sleep(delay / 2);
      tempArray[j].state = ElementStates.Default;
      tempArray[j + 1].state = ElementStates.Default;
      setState([...tempArray]);
    }
    tempArray[length - 1 - i].state = ElementStates.Modified;
    setState([...tempArray]);
  }
};

const selectionSort = async (
  array: ArrayElement[],
  compare: (first: number, second: number) => boolean,
  setState: Dispatch<SetStateAction<ArrayElement[]>>,
  delay: number
) => {
  const tempArray = [...array];
  const { length } = tempArray;

  for (let i = 0; i <= length - 1; i += 1) {
    tempArray[i].state = ElementStates.Changing;
    setState([...tempArray]);
    let searchedIndx = i;

    for (let j = i + 1; j <= length - 1; j += 1) {
      tempArray[j].state = ElementStates.Changing;
      setState([...tempArray]);

      await sleep(delay);
      if (compare(tempArray[searchedIndx].index, tempArray[j].index)) {
        searchedIndx = j;
      }

      tempArray[j].state = ElementStates.Default;
      setState([...tempArray]);
    }

    tempArray[i].state = ElementStates.Default;
    swap(tempArray, i, searchedIndx);
    tempArray[i].state = ElementStates.Modified;
    setState([...tempArray]);
  }
};

const numbersAscending = (first: number, second: number) => {
  return first - second > 0;
};

const numbersDescending = (first: number, second: number) => {
  return first - second < 0;
};

export { bubbleSort, selectionSort, numbersAscending, numbersDescending };
