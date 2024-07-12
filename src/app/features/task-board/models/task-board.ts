export interface Board {
  id: number;
  name: string;
}

export interface List {
  id: number;
  boardId: number;
  name: string;
}

export interface Card {
  id: number;
  listId: number;
  title: string;
  description: string;
  creationDate: Date;
  priority: string;
}
