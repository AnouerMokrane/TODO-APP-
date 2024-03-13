export type Todo = {
  id: number;
  title: string;
  status: StatusEnum;
};

export type FormInputs = {
  title: string;
  status: StatusEnum;
};

export enum StatusEnum {
  completed = "completed",
  incompleted = "incompleted",
}
