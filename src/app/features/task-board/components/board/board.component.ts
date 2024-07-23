import { Component, OnInit } from '@angular/core';
import { TaskBoardService } from '../../services/task-board.service';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { Board, List } from '../../models/task-board';
import { AsyncPipe } from '@angular/common';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [AsyncPipe, ListComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  boardId!: number;
  board!: Board;
  lists$: Observable<List[]> = of([]);
  boardChanged$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private taskBoardService: TaskBoardService,
    private route: ActivatedRoute
  ) {
    this.getCurrentBoard();
  }

  ngOnInit(): void {
    this.listenToBoardChange();
  }

  private getCurrentBoard(): void {
    this.route.params
      .pipe(
        map((params: Params) => {
          this.boardId = +params['id'];
          return this.boardId;
        }),
        switchMap(boardId => {
          return this.taskBoardService.getBoardById(boardId);
        })
      )
      .subscribe((board: Board) => {
        console.log('current board: ', board);
        this.board = board;
        this.boardChanged$.next(true);
      });
  }

  private listenToBoardChange(): void {
    this.lists$ = this.boardChanged$.pipe(
      filter((shouldGetLists: boolean) => shouldGetLists === true),
      switchMap(() => {
        return this.getListsForCurrentBoard(this.boardId);
      })
    );
  }

  private getListsForCurrentBoard(boardId: number): Observable<List[]> {
    return this.taskBoardService.getListsForBoard(boardId).pipe(
      tap((lists: List[]) => {
        console.log('returned lists for board: ', this.board, '| ', lists);
      })
    );
  }
}
