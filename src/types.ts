export type Page = {
  group?: string;
  title?: string;
  url: string;
};

export type State = Page[]

export enum ActionType {
  Add = 'ADD',
  Delete = 'DELETE',
  Import = 'IMPORT',
  Reset = 'RESET'
}

export type Action = {
  type: ActionType;
  page?: Page;
  state?: State
};
