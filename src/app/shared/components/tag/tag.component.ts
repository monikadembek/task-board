import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface Tag {
  label: string;
  color: string;
}

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  @Input() color!: string;
  @Input() label!: string;
}
