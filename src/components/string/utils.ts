import { Dispatch, SetStateAction } from "react";
import { sleep } from "../../utils/utils";
import { swap } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { Letter } from "../../types/letter";

const reverseString = async (
  array: Letter[],
  setState: Dispatch<SetStateAction<Letter[]>>,
  delay: number
) => {
  await sleep(delay);
  const { length } = array;
  for (let i = 0; i < Math.ceil(length / 2); i += 1) {
    const fistElementIdx = i;
    const secondElementIdx = length - i - 1;

    if (fistElementIdx < secondElementIdx) {
      array[fistElementIdx].state = ElementStates.Changing;
      array[secondElementIdx].state = ElementStates.Changing;
      setState([...array]);

      await sleep(delay);
      swap(array, fistElementIdx, secondElementIdx);

      array[fistElementIdx].state = ElementStates.Modified;
      array[secondElementIdx].state = ElementStates.Modified;
      setState([...array]);
    } else {
      array[fistElementIdx].state = ElementStates.Modified;
      setState([...array]);
    }
  }
};

export { reverseString };
