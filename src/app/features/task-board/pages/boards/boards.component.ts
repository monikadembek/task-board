import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardsListComponent } from '../../components/boards-list/boards-list.component';
import { TaskBoardService } from '../../services/task-board.service';
import { Board } from '../../models/task-board';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [RouterOutlet, BoardsListComponent],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss',
})
export class BoardsComponent implements OnInit {
  taskBoardService = inject(TaskBoardService);

  boards$!: Observable<Board[]>;

  ngOnInit(): void {
    this.boards$ = this.taskBoardService
      .getBoards()
      .pipe(tap((data: Board[]) => console.log('boards: ', data)));
  }
}
