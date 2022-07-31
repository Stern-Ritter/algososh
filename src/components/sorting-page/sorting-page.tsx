import React, {
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {
  bubbleSort,
  selectionSort,
  numbersAscending,
  numbersDescending,
} from "./utils";
import { randomArr } from "../../utils/utils";
import { ArrayElement } from "../../types/array-element";
import { Direction } from "../../types/direction";
import { Sorting } from "../../types/sorting";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { MIN_VALUE, MAX_VALUE, MIN_LEN, MAX_LEN } from "../../constants/array";
import styles from "./sorting-page.module.css";

const directions = {
  [Direction.Ascending]: numbersAscending,
  [Direction.Descending]: numbersDescending,
};
const sorting = {
  [Sorting.Selection]: selectionSort,
  [Sorting.Bubble]: bubbleSort,
};

export const SortingPage: React.FC = () => {
  const [numbersArray, setNumbersArray] = useState<ArrayElement[]>([]);
  const [sort, setSort] = useState<Sorting>(Sorting.Selection);
  const [isSorting, setIsSorting] = useState(false);
  const [isAscendingSorting, setIsAscendingSorting] = useState(false);
  const [isDescendingSorting, setIsDescendingSorting] = useState(false);

  const randomArrayGenerate = useCallback(() => {
    const array = randomArr(MIN_VALUE, MAX_VALUE, MIN_LEN, MAX_LEN).map(
      (number) => ({
        index: number,
        state: ElementStates.Default,
      })
    );
    setNumbersArray(array);
  }, [setNumbersArray]);

  useEffect(() => {
    randomArrayGenerate();
  }, [randomArrayGenerate]);

  const sortArray = useCallback(
    async (
      array: ArrayElement[],
      type: Sorting,
      direction: Direction,
      setIsLoading: Dispatch<SetStateAction<boolean>>
    ) => {
      const sortingArray = array.map((el) => ({
        ...el,
        state: ElementStates.Default,
      }));

      setIsSorting(true);
      setIsLoading(true);

      await sorting[type](
        sortingArray,
        directions[direction],
        setNumbersArray,
        DELAY_IN_MS
      );

      setIsSorting(false);
      setIsLoading(false);
    },
    [setIsSorting]
  );

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.mainContainer}>
        <div className={styles.controls}>
          <div className={styles.container}>
            <RadioInput
              label="Выбор"
              name="typeOfSorting"
              onChange={() => setSort(Sorting.Selection)}
              checked={sort === Sorting.Selection}
              disabled={isSorting}
              extraClass={styles.input}
            />
            <RadioInput
              label="Пузырек"
              name="typeOfSorting"
              onChange={() => setSort(Sorting.Bubble)}
              checked={sort === Sorting.Bubble}
              disabled={isSorting}
              extraClass={styles.input}
            />
          </div>

          <div className={styles.container}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              onClick={() =>
                sortArray(
                  numbersArray,
                  sort,
                  Direction.Ascending,
                  setIsAscendingSorting
                )
              }
              disabled={isSorting}
              isLoader={isAscendingSorting}
              extraClass={styles.button}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              onClick={() =>
                sortArray(
                  numbersArray,
                  sort,
                  Direction.Descending,
                  setIsDescendingSorting
                )
              }
              disabled={isSorting}
              isLoader={isDescendingSorting}
              extraClass={styles.button}
            />
          </div>

          <Button
            text="Новый массив"
            onClick={randomArrayGenerate}
            disabled={isSorting}
            extraClass={styles.button}
          />
        </div>
        <ul className={styles.array}>
          {numbersArray.map(({ index, state }, idx) => (
            <li key={idx} className={styles.arrayElement}>
              <Column index={index} state={state} />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
