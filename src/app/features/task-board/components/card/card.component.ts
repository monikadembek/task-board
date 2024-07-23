import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../models/task-board';
import { TagComponent } from '../../../../shared/components/tag/tag.component';

type Priority = 'high' | 'medium' | 'low';

export const priorityColors: Record<Priority, string> = {
  high: '#4bad42',
  medium: '#eb077e',
  low: '#21b7f9',
};

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [TagComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() card!: Card;

  tagColor = '';

  ngOnInit(): void {
    this.tagColor = priorityColors[this.card.priority as Priority];
  }
}
