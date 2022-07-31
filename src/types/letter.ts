import { ElementStates } from "./element-states";

export interface Letter {
  letter: string;
  state: ElementStates;
  head?: string;
  tail?: string;
}
