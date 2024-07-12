import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskBoardService } from './features/task-board/services/task-board.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'task-board';

  taskBoardService = inject(TaskBoardService);

  ngOnInit(): void {
    this.taskBoardService
      .getBoards()
      .subscribe(data => console.log('boards: ', data));

    this.taskBoardService
      .getListsForBoard(1)
      .subscribe(data => console.log('returned lists: ', data));

    this.taskBoardService
      .getCardsForList(2)
      .subscribe(data => console.log('returned cards: ', data));
  }
}
