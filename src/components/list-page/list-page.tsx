import React, {
  ChangeEvent,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./linkedList";
import { ElementStates } from "../../types/element-states";
import { sleep, randomArr } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import {
  MIN_VALUE,
  MAX_VALUE,
  MIN_LEN,
  MAX_LEN,
} from "../../constants/linkedList";
import { Letter } from "../../types/letter";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const [valueInput, setValueInput] = useState("");
  const [indexInput, setIndexInput] = useState("");
  const [linkedList, setLinkedList] = useState(new LinkedList<Letter>());
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingInHead, setIsAddingInHead] = useState(false);
  const [isAddingInTail, setIsAddingInTail] = useState(false);
  const [isDeletingFromHead, setIsDeletingFromHead] = useState(false);
  const [isDeletingFromTail, setIsDeletingFromTail] = useState(false);
  const [isAddingByIndex, setIsAddingByIndex] = useState(false);
  const [isDeletingByIndex, setIsDeletingByIndex] = useState(false);

  useEffect(() => {
    const array = randomArr(MIN_VALUE, MAX_VALUE, MIN_LEN, MAX_LEN).map(
      (element) => ({ letter: String(element), state: ElementStates.Default })
    );
    setLinkedList(new LinkedList(array));
  }, [setLinkedList]);

  const linkedListValues = useMemo(() => linkedList.toArray(), [linkedList]);

  const linkedListIsEmpty = useMemo(
    () => linkedListValues.length === 0,
    [linkedListValues]
  );
  const valueInputIsEmpty = useMemo(
    () => valueInput.length === 0,
    [valueInput]
  );
  const indexInputIsEmpty = useMemo(
    () => indexInput.length === 0,
    [indexInput]
  );

  const handleLinkedListPrepend = useCallback(
    async (editingLinkedList: LinkedList<Letter>, value: string) => {
      setIsLoading(true);
      setIsAddingInHead(true);
      setValueInput("");

      const headElement = editingLinkedList.getHead();
      if (headElement) {
        headElement.value.head = value;
      }
      setLinkedList(new LinkedList(editingLinkedList.toArray()));
      await sleep(SHORT_DELAY_IN_MS);

      if (headElement) {
        headElement.value.head = undefined;
      }
      const element = { letter: value, state: ElementStates.Modified };
      editingLinkedList.prepend(element);
      setLinkedList(new LinkedList(editingLinkedList.toArray()));
      await sleep(SHORT_DELAY_IN_MS);

      element.state = ElementStates.Default;
      setLinkedList(new LinkedList(editingLinkedList.toArray()));

      setIsLoading(false);
      setIsAddingInHead(false);
    },
    [setIsLoading, setIsAddingInHead, setValueInput, setLinkedList]
  );

  const handleLinkedListAppend = useCallback(
    async (editingLinkedList: LinkedList<Letter>, value: string) => {
      setIsLoading(true);
      setIsAddingInTail(true);
      setValueInput("");

      const tailElement = editingLinkedList.getTail();
      if (tailElement) {
        tailElement.value.head = value;
      }
      setLinkedList(new LinkedList(editingLinkedList.toArray()));
      await sleep(SHORT_DELAY_IN_MS);

      if (tailElement) {
        tailElement.value.head = undefined;
      }
      const element = { letter: value, state: ElementStates.Modified };
      editingLinkedList.append(element);
      setLinkedList(new LinkedList(editingLinkedList.toArray()));
      await sleep(SHORT_DELAY_IN_MS);

      element.state = ElementStates.Default;
      setLinkedList(new LinkedList(editingLinkedList.toArray()));

      setIsLoading(false);
      setIsAddingInTail(false);
    },
    [setIsLoading, setIsAddingInTail, setValueInput, setLinkedList]
  );

  const handleLinkedListInsertAt = useCallback(
    async (
      editingLinkedList: LinkedList<Letter>,
      value: string,
      index: number
    ) => {
      setIsLoading(true);
      setIsAddingByIndex(true);
      setValueInput("");
      setIndexInput("");

      let findingElement;
      for (let i = 0; i <= index; i++) {
        if (findingElement) {
          findingElement.state = ElementStates.Changing;
          findingElement.head = undefined;
        }

        findingElement = editingLinkedList.getElementByIndex(i);
        if (findingElement) {
          findingElement.head = value;
        }

        setLinkedList(new LinkedList(editingLinkedList.toArray()));
        await sleep(SHORT_DELAY_IN_MS);
      }

      for (let i = 0; i <= index; i++) {
        const editingElement = editingLinkedList.getElementByIndex(i);
        if (editingElement) {
          editingElement.state = ElementStates.Default;
          if (i === index) {
            editingElement.head = undefined;
          }
        }
      }
      const element = { letter: value, state: ElementStates.Modified };
      editingLinkedList.addByIndex(element, Number(index));
      setLinkedList(new LinkedList(editingLinkedList.toArray()));
      await sleep(SHORT_DELAY_IN_MS);

      element.state = ElementStates.Default;
      setLinkedList(new LinkedList(editingLinkedList.toArray()));

      setIsLoading(false);
      setIsAddingByIndex(false);
    },
    [
      setIsLoading,
      setIsAddingByIndex,
      setValueInput,
      setIndexInput,
      setLinkedList,
    ]
  );

  const handleLinkedListDeleteHead = useCallback(
    async (editingLinkedList: LinkedList<Letter>) => {
      setIsLoading(true);
      setIsDeletingFromHead(true);

      const headElement = editingLinkedList.getHead();
      if (headElement) {
        headElement.value.tail = headElement.value.letter;
        headElement.value.letter = "";
      }
      setLinkedList(new LinkedList(editingLinkedList.toArray()));
      await sleep(SHORT_DELAY_IN_MS);

      editingLinkedList.deleteHead();
      setLinkedList(new LinkedList(editingLinkedList.toArray()));

      setIsLoading(false);
      setIsDeletingFromHead(false);
    },
    [setIsLoading, setIsDeletingFromHead, setLinkedList]
  );

  const handleLinkedListDeleteTail = useCallback(
    async (editingLinkedList: LinkedList<Letter>) => {
      setIsLoading(true);
      setIsDeletingFromTail(true);

      const tailElement = editingLinkedList.getTail();
      if (tailElement) {
        tailElement.value.tail = tailElement.value.letter;
        tailElement.value.letter = "";
      }
      setLinkedList(new LinkedList(editingLinkedList.toArray()));
      await sleep(SHORT_DELAY_IN_MS);

      editingLinkedList.deleteTail();
      setLinkedList(new LinkedList(editingLinkedList.toArray()));

      setIsLoading(false);
      setIsDeletingFromTail(false);
    },
    [setIsLoading, setIsDeletingFromTail, setLinkedList]
  );

  const handleLinkedListRemoveAt = useCallback(
    async (editingLinkedList: LinkedList<Letter>, index: number) => {
      setIsLoading(true);
      setIsDeletingByIndex(true);
      setIndexInput("");

      for (let i = 0; i <= index; i++) {
        const findingElement = editingLinkedList.getElementByIndex(i);
        if (findingElement) {
          if (i === index) {
            findingElement.tail = findingElement.letter;
            findingElement.letter = "";
          } else {
            findingElement.state = ElementStates.Changing;
          }
        }

        setLinkedList(new LinkedList(editingLinkedList.toArray()));
        await sleep(SHORT_DELAY_IN_MS);
      }

      for (let i = 0; i < index; i++) {
        const editingElement = editingLinkedList.getElementByIndex(i);
        if (editingElement) {
          editingElement.state = ElementStates.Default;
        }
      }

      editingLinkedList.deleteByIndex(index);
      setLinkedList(new LinkedList(editingLinkedList.toArray()));

      setIsLoading(false);
      setIsDeletingByIndex(false);
    },
    [setIsLoading, setIsDeletingByIndex, setIndexInput, setLinkedList]
  );

  const handleValueInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setValueInput(evt.target.value);
    },
    [setValueInput]
  );

  const handleIndexInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setIndexInput(evt.target.value);
    },
    [setIndexInput]
  );

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.mainContainer}>
        <div className={styles.controls}>
          <Input
            placeholder="Введите значение"
            value={valueInput}
            onChange={handleValueInputChange}
            maxLength={4}
            isLimitText
            extraClass={styles.input}
          />
          <Button
            text="Добавить в head"
            onClick={() => handleLinkedListPrepend(linkedList, valueInput)}
            linkedList="small"
            isLoader={isAddingInHead}
            disabled={valueInputIsEmpty || isLoading}
          />
          <Button
            text="Добавить в tail"
            onClick={() => handleLinkedListAppend(linkedList, valueInput)}
            linkedList="small"
            isLoader={isAddingInTail}
            disabled={valueInputIsEmpty || isLoading}
          />
          <Button
            text="Удалить из head"
            onClick={() => handleLinkedListDeleteHead(linkedList)}
            linkedList="small"
            isLoader={isDeletingFromHead}
            disabled={linkedListIsEmpty || isLoading}
          />
          <Button
            text="Удалить из tail"
            onClick={() => handleLinkedListDeleteTail(linkedList)}
            linkedList="small"
            isLoader={isDeletingFromTail}
            disabled={linkedListIsEmpty || isLoading}
          />
        </div>
        <div className={styles.controls}>
          <Input
            placeholder="Введите индекс"
            value={indexInput}
            onChange={handleIndexInputChange}
            extraClass={styles.input}
          />
          <Button
            text="Добавить по индексу"
            onClick={() =>
              handleLinkedListInsertAt(
                linkedList,
                valueInput,
                Number(indexInput)
              )
            }
            linkedList="big"
            isLoader={isAddingByIndex}
            disabled={valueInputIsEmpty || indexInputIsEmpty || isLoading}
          />
          <Button
            text="Удалить по индексу"
            onClick={() =>
              handleLinkedListRemoveAt(linkedList, Number(indexInput))
            }
            linkedList="big"
            isLoader={isDeletingByIndex}
            disabled={linkedListIsEmpty || indexInputIsEmpty || isLoading}
          />
        </div>
        <ul className={styles.linkedList}>
          {linkedListValues.map(({ letter, state, head, tail }, idx, arr) => (
            <li key={idx} className={styles.linkedListItem}>
              <Circle
                letter={letter}
                state={state}
                index={idx}
                head={
                  head ? (
                    <Circle
                      letter={head}
                      state={ElementStates.Changing}
                      isSmall
                    />
                  ) : idx === 0 ? (
                    "head"
                  ) : (
                    ""
                  )
                }
                tail={
                  tail ? (
                    <Circle
                      letter={tail}
                      state={ElementStates.Changing}
                      isSmall
                    />
                  ) : idx === arr.length - 1 ? (
                    "tail"
                  ) : (
                    ""
                  )
                }
                extraClass={styles.circle}
              />
              {idx !== arr.length - 1 && <ArrowIcon />}
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
