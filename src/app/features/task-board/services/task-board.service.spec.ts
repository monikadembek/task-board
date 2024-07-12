import { TestBed } from '@angular/core/testing';

import { TaskBoardService } from './task-board.service';

describe('TaskBoardService', () => {
  let service: TaskBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
