interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
  getSize: () => number;
  toArray: () => T[];
}

export class Stack<T> implements IStack<T> {
  private container: T[];

  constructor(container?: T[]) {
    this.container = container || [];
  }

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    return this.container[this.container.length - 1];
  };

  clear = () => {
    this.container.length = 0;
  };

  getSize = () => this.container.length;

  toArray = () => [...this.container];
}
