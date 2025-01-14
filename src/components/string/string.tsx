import React, { useState, useMemo, useCallback, ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Letter } from "../../types/letter";
import { reverseString } from "./utils";
import { DELAY_IN_MS } from "../../constants/delays";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [lettersArray, setLettersArray] = useState<Letter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputIsEmpty = useMemo(() => inputValue.length === 0, [inputValue]);

  const handleReverseButtonClick = useCallback(
    async (value: string) => {
      setIsLoading(true);
      setInputValue("");

      const letters = value
        .split("")
        .map((letter) => ({ letter, state: ElementStates.Default }));
      setLettersArray(letters);

      await reverseString(letters, setLettersArray, DELAY_IN_MS);

      setIsLoading(false);
    },
    [setIsLoading, setInputValue, setLettersArray]
  );

  const handleInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setInputValue(evt.target.value);
    },
    [setInputValue]
  );

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          maxLength={11}
          isLimitText
          extraClass={styles.input}
        />
        <Button
          text="Развернуть"
          isLoader={isLoading}
          disabled={inputIsEmpty}
          onClick={() => handleReverseButtonClick(inputValue)}
        />
      </div>
      <ul className={styles.lettersContainer}>
        {lettersArray.map(({ letter, state }, idx) => (
          <li key={idx} className={styles.letter}>
            <Circle letter={letter} state={state} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
