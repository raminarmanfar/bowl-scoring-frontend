import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringBoardComponent } from './scoring-board.component';
import {MatDialogModule} from '@angular/material/dialog';

describe('ScoringBoardComponent', () => {
  let component: ScoringBoardComponent;
  let fixture: ComponentFixture<ScoringBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ ScoringBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoringBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
