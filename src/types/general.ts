export type TTicketButton = {
  number: number;
  isSelected: boolean;
};

export type TResult = {
  selectedNumber: { firstField: number[]; secondField: number[] };
  isTicketWon: boolean;
};

type TSelectCounter = {
  first: number;
  second: number;
};

export type TTicketState = {
  firstField: TTicketButton[];
  secondField: TTicketButton[];
  selectCounter: TSelectCounter;
  isSelectedAll: boolean;
  result: TResult;
  isResultCalculated: boolean;
  isResultSend: boolean | null;
};
