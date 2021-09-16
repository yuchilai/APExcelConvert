export interface ICount {
  id?: string;
  start?: number;
  end?: number;
}

export class Count implements ICount {
  constructor(public id?: string, public start?: number, public end?: number) {}
}
