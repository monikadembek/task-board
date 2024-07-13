import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../../models/task-board';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-boards-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './boards-list.component.html',
  styleUrl: './boards-list.component.scss',
})
export class BoardsListComponent {
  @Input() boards$!: Observable<Board[]>;

  removeSpaces(url: string): string {
    return encodeURIComponent(decodeURIComponent(url).replace(/\s+/g, '-'));
  }
}
