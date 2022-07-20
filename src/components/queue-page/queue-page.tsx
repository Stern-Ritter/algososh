import React, { useState, ChangeEvent, useMemo, useCallback } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./queue";
import { ElementStates } from "../../types/element-states";
import { Letter } from "../../types/letter";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { QUEUE_SIZE } from "../../constants/queue";
import styles from "./queue-page.module.css";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [queue, setQueue] = useState(new Queue<Letter>({ size: QUEUE_SIZE }));
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const getQueueOptions = useCallback(
    (queue: Queue<Letter>) => ({
      size: QUEUE_SIZE,
      options: {
        container: queue.toArray(),
        head: queue.getHead(),
        tail: queue.getTail(),
        size: queue.getSize(),
        length: queue.getLength(),
      },
    }),
    []
  );

  const queueValues = useMemo(() => queue.toArray(), [queue]);
  const queueHead = useMemo(() => queue.getHead(), [queue]);
  const queueTail = useMemo(() => queue.getTail(), [queue]);
  const queueSize = useMemo(() => queue.getSize(), [queue]);

  const queueIsEmpty = useMemo(
    () => queueValues.every((el) => el === null),
    [queueValues]
  );
  const inputIsEmpty = useMemo(() => inputValue.length === 0, [inputValue]);

  const handleQueueEnqueue = useCallback(
    async (editingQueue: Queue<Letter>, value: string) => {
      try {
        setIsLoading(true);
        setIsAdding(true);
        setInputValue("");

        const element = { letter: "", state: ElementStates.Changing };
        editingQueue.enqueue(element);
        setQueue(new Queue(getQueueOptions(editingQueue)));

        await sleep(SHORT_DELAY_IN_MS);

        element.letter = value;
        element.state = ElementStates.Default;
        setQueue(new Queue(getQueueOptions(editingQueue)));
      } catch (err) {
        console.log(`Queue enqueue error: ${(err as Error).message}`);
      } finally {
        setIsLoading(false);
        setIsAdding(false);
      }
    },
    [setIsLoading, setIsAdding, setInputValue, setQueue, getQueueOptions]
  );

  const handleQueueDequeue = useCallback(
    async (editingQueue: Queue<Letter>) => {
      try {
        setIsLoading(true);
        setIsDeleting(true);

        const lastElement = editingQueue.peak();
        if (lastElement) {
          lastElement.state = ElementStates.Changing;
          setQueue(new Queue(getQueueOptions(editingQueue)));
        }

        await sleep(SHORT_DELAY_IN_MS);

        editingQueue.dequeue();
        setQueue(new Queue(getQueueOptions(editingQueue)));
      } catch (err) {
        console.log(`Queue deueue error: ${(err as Error).message}`);
      } finally {
        setIsLoading(false);
        setIsDeleting(false);
      }
    },
    [setIsLoading, setIsDeleting, setQueue, getQueueOptions]
  );

  const handleQueueClear = useCallback(async () => {
    setIsLoading(true);
    setIsClearing(true);

    await sleep(SHORT_DELAY_IN_MS);
    setQueue(new Queue({ size: QUEUE_SIZE }));

    setIsLoading(false);
    setIsClearing(false);
  }, [setIsLoading, setIsClearing, setQueue]);

  const handleInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setInputValue(evt.target.value);
    },
    [setInputValue]
  );

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.mainContainer}>
        <div className={styles.controls}>
          <div className={styles.container}>
            <Input
              placeholder="Введите значение"
              value={inputValue}
              onChange={handleInputChange}
              maxLength={4}
              isLimitText
              extraClass={styles.input}
            />
            <Button
              text="Добавить"
              onClick={() => handleQueueEnqueue(queue, inputValue)}
              isLoader={isAdding}
              disabled={inputIsEmpty || isLoading}
              extraClass={styles.add}
            />
            <Button
              text="Удалить"
              onClick={() => handleQueueDequeue(queue)}
              isLoader={isDeleting}
              disabled={queueIsEmpty || isLoading}
              extraClass={styles.delete}
            />
          </div>
          <Button
            text="Очистить"
            onClick={() => handleQueueClear()}
            isLoader={isClearing}
            disabled={queueIsEmpty || isLoading}
            extraClass={styles.clear}
          />
        </div>

        <ul className={styles.queue}>
          {queueValues.map((element, idx, arr) => (
            <li key={idx} className={styles.queueItem}>
              <Circle
                letter={element?.letter}
                state={element?.state}
                index={idx}
                head={
                  queueHead % queueSize === idx && element?.letter ? "head" : ""
                }
                tail={
                  ((queueTail - 2) % queueSize === idx &&
                    arr[(queueTail - 1) % queueSize]?.letter === "") ||
                  ((queueTail - 1) % queueSize === idx && element?.letter)
                    ? "tail"
                    : ""
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
