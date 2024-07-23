import { Component, Input, OnInit } from '@angular/core';
import { Card, List } from '../../models/task-board';
import { TaskBoardService } from '../../services/task-board.service';
import { map } from 'rxjs';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  @Input() list!: List;
  cards: Card[] = [];

  constructor(private taskBoardService: TaskBoardService) {}

  ngOnInit(): void {
    this.getCardsForList(this.list.id);
  }

  private getCardsForList(listId: number): void {
    this.taskBoardService
      .getCardsForList(listId)
      .pipe(
        map((cards: Card[]) => {
          console.log('returned cards for list: ', listId, '| ', cards);
          this.cards = cards;
          return cards;
        })
      )
      .subscribe();
  }
}
