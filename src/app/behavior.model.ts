export interface IBehavior {
  id?: number;
  fileName?: string;
  auto?: boolean;
  fileAccepted?: boolean;
  selectedInde?: number;
  addingMode?: boolean;
  extra?: string;
}

export class Behavior implements IBehavior {
  constructor(
    public id?: number,
    public fileName?: string,
    public auto?: boolean,
    public fileAccepted?: boolean,
    public selectedInde?: number,
    public addingMode?: boolean,
    public extra?: string
  ) {}
}
