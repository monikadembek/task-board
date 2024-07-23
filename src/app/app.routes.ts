import { Routes } from '@angular/router';
import { BoardComponent } from './features/task-board/components/board/board.component';

export const routes: Routes = [
  {
    path: 'boards',
    title: 'Task boards',
    loadComponent: () =>
      import('./features/task-board/pages/boards/boards.component').then(
        m => m.BoardsComponent
      ),
    children: [
      {
        path: ':id/:title',
        title: 'Tour board',
        component: BoardComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/boards',
  },
];
