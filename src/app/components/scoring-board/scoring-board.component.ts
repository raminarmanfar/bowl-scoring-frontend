import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ScoreService} from '../../services/score.service';
import {NewGameDialogComponent} from '../new-game-dialog/new-game-dialog.component';

@Component({
  selector: 'app-scoring-board',
  templateUrl: './scoring-board.component.html',
  styleUrls: ['./scoring-board.component.scss']
})
export class ScoringBoardComponent {

  constructor(public scoreService: ScoreService, public dialog: MatDialog) {
  }

  onResetClick(): void {
    const dialogRef = this.dialog.open(NewGameDialogComponent, {width: '350px'});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.scoreService.resetScoring();
      }
    });
  }
}
