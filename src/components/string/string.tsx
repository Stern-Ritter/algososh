import React, { useState, useMemo, useCallback, ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Letter } from "../../types/letter";
import { swap, sleep } from "../../utils/utils";
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

      await sleep(DELAY_IN_MS);
      const { length } = letters;
      for (let i = 0; i <= Math.floor(length / 2); i += 1) {
        const fistElementIdx = i;
        const secondElementIdx = length - i - 1;

        if (fistElementIdx !== secondElementIdx) {
          letters[fistElementIdx].state = ElementStates.Changing;
          letters[secondElementIdx].state = ElementStates.Changing;
          setLettersArray([...letters]);

          await sleep(DELAY_IN_MS);
          swap(letters, fistElementIdx, secondElementIdx);

          letters[fistElementIdx].state = ElementStates.Modified;
          letters[secondElementIdx].state = ElementStates.Modified;
          setLettersArray([...letters]);
        } else {
          letters[fistElementIdx].state = ElementStates.Modified;
          setLettersArray([...letters]);
        }
      }

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
