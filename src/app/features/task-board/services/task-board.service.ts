import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Board, Card, List } from '../models/task-board';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskBoardService {
  boardsEndpoint = 'http://localhost:3000/boards';
  listsEndpoint = 'http://localhost:3000/lists';
  cardsEndpoint = 'http://localhost:3000/cards';

  constructor(private http: HttpClient) {}

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.boardsEndpoint);
  }

  getBoardById(boardId: number): Observable<Board> {
    return this.http.get<Board>(`${this.boardsEndpoint}/${boardId}`);
  }

  getListsForBoard(boardId: number): Observable<List[]> {
    return this.http.get<List[]>(this.listsEndpoint).pipe(
      map((items: List[]) => {
        let lists = [];
        lists = items.filter((item: List) => item.boardId === boardId);
        return lists;
      })
    );
  }

  getCardsForList(listId: number): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsEndpoint).pipe(
      map((items: Card[]) => {
        let lists = [];
        lists = items.filter((item: Card) => item.listId === listId);
        return lists;
      })
    );
  }
}
