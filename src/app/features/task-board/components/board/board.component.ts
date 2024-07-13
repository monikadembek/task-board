import { Component, OnInit } from '@angular/core';
import { TaskBoardService } from '../../services/task-board.service';
import { ActivatedRoute, Params } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Board } from '../../models/task-board';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  boardId!: number;
  board!: Board;

  constructor(
    private taskBoardService: TaskBoardService,
    private route: ActivatedRoute
  ) {
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
      });
  }

  ngOnInit(): void {
    this.taskBoardService
      .getListsForBoard(this.boardId)
      .subscribe(data =>
        console.log('returned lists for board: ', this.board, '| ', data)
      );

    // this.taskBoardService
    //   .getCardsForList(2)
    //   .subscribe(data => console.log('returned cards: ', data));
  }
}
