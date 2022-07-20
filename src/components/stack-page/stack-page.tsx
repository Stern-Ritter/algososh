import React, { useState, ChangeEvent, useMemo, useCallback } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./stack";
import { ElementStates } from "../../types/element-states";
import { Letter } from "../../types/letter";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [stack, setStack] = useState(new Stack<Letter>());
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const stackValues = useMemo(() => stack.toArray(), [stack]);

  const stackIsEmpty = useMemo(() => stackValues.length === 0, [stackValues]);
  const inputIsEmpty = useMemo(() => inputValue.length === 0, [inputValue]);

  const handleStackPush = useCallback(
    async (editingStack: Stack<Letter>, value: string) => {
      setIsLoading(true);
      setIsAdding(true);
      setInputValue("");

      const element = { letter: value, state: ElementStates.Changing };
      editingStack.push(element);
      setStack(new Stack(editingStack.toArray()));

      await sleep(SHORT_DELAY_IN_MS);

      element.state = ElementStates.Default;
      setStack(new Stack(editingStack.toArray()));

      setIsLoading(false);
      setIsAdding(false);
    },
    [setIsLoading, setIsAdding, setInputValue, setStack]
  );

  const handleStackPop = useCallback(
    async (editingStack: Stack<Letter>) => {
      setIsLoading(true);
      setIsDeleting(true);

      const lastElement = editingStack.peak();
      if (lastElement) {
        lastElement.state = ElementStates.Changing;
        setStack(new Stack(editingStack.toArray()));
      }

      await sleep(SHORT_DELAY_IN_MS);

      editingStack.pop();
      setStack(new Stack(editingStack.toArray()));

      setIsLoading(false);
      setIsDeleting(false);
    },
    [setIsLoading, setIsDeleting, setStack]
  );

  const handleStackClear = useCallback(async () => {
    setIsLoading(true);
    setIsClearing(true);

    await sleep(SHORT_DELAY_IN_MS);
    setStack(new Stack());

    setIsLoading(false);
    setIsClearing(false);
  }, [setIsLoading, setIsClearing, setStack]);

  const handleInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setInputValue(evt.target.value);
    },
    [setInputValue]
  );

  return (
    <SolutionLayout title="Стек">
      <div className={styles.mainContainer}>
        <div className={styles.controls}>
          <div className={styles.container}>
            <Input
              value={inputValue}
              onChange={handleInputChange}
              maxLength={4}
              isLimitText
              extraClass={styles.input}
            />
            <Button
              text="Добавить"
              onClick={() => handleStackPush(stack, inputValue)}
              isLoader={isAdding}
              disabled={inputIsEmpty || isLoading}
              extraClass={styles.add}
            />
            <Button
              text="Удалить"
              onClick={() => handleStackPop(stack)}
              isLoader={isDeleting}
              disabled={stackIsEmpty || isLoading}
              extraClass={styles.delete}
            />
          </div>
          <Button
            text="Очистить"
            onClick={() => handleStackClear()}
            isLoader={isClearing}
            disabled={stackIsEmpty || isLoading}
            extraClass={styles.clear}
          />
        </div>

        <ul className={styles.stack}>
          {stackValues.map(({ letter, state }, idx, arr) => (
            <li key={idx} className={styles.stackItem}>
              <Circle
                letter={letter}
                state={state}
                index={idx}
                head={idx === arr.length - 1 ? "top" : ""}
              />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
