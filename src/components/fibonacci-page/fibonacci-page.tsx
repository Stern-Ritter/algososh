import React, { useState, useMemo, useCallback, ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { getFibonacciNumbers } from "./utils";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [numbersArray, setNumbersArray] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputIsEmpty = useMemo(() => inputValue.length === 0, [inputValue]);

  const handleCalculateButtonClick = useCallback(
    async (count: number) => {
      setIsLoading(true);
      setInputValue("");

      const array = getFibonacciNumbers(count);
      const renderedArray = [] as number[];
      for (const number of array) {
        renderedArray.push(number);
        setNumbersArray([...renderedArray]);
        await sleep(SHORT_DELAY_IN_MS);
      }

      setIsLoading(false);
    },
    [setIsLoading, setInputValue, setNumbersArray]
  );

  const checkRange = useCallback((value: string, min: number, max: number) => {
    const number = Number(value);
    return value !== "" && (number < min || number > max);
  }, []);

  const handleInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setInputValue(evt.target.value);
    },
    [setInputValue]
  );

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          type="number"
          min={1}
          max={19}
          isLimitText
          extraClass={styles.input}
        />
        <Button
          text="Рассчитать"
          isLoader={isLoading}
          disabled={inputIsEmpty || checkRange(inputValue, 1, 19)}
          onClick={() => handleCalculateButtonClick(Number(inputValue))}
        />
      </div>
      <ul className={styles.numbersContainer}>
        {numbersArray.map((number, idx) => (
          <li key={idx}>
            <Circle letter={String(number)} index={idx} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
