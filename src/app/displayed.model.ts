export interface IDisplayed {
  name?: string;
  displayList?: any[];
}

export class Displayed implements IDisplayed {
  constructor(public name?: string, public displayList?: any[]) {}
}
