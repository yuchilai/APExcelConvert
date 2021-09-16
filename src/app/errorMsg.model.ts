export interface IErrorMsg {
  msg?: string;
  isDisplayed?: boolean;
}

export class ErrorMsg implements IErrorMsg {
  constructor(public msg?: string, public isDisplayed?: boolean) {}
}
