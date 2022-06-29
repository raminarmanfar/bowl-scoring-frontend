import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {ApiService} from '../../services/api.service';
import {NewGameDialogComponent} from '../new-game-dialog/new-game-dialog.component';
import {BowlScore} from '../../models/bowl-score';
import {Frame} from '../../models/frame';
import {StepEnum} from '../../models/step.enum';

@Component({
  selector: 'app-scoring-board',
  templateUrl: './scoring-board.component.html',
  styleUrls: ['./scoring-board.component.scss'],
})
export class ScoringBoardComponent implements OnInit {
  public readonly LAST_FRAME_INDEX = 9;
  public isLoading = false;

  public bowlScore: BowlScore = {
    currentFrameIndex: 0,
    currentRound: StepEnum.FIRST,
    gameOver: false,
    keypadValueThreshold: 10,
    frames: [],
    lastFrameBlockVisible: false
  };
  // constructor(public scoreService: ScoreService, public dialog: MatDialog) {
  // }

  constructor(public apiService: ApiService, public dialog: MatDialog) {
  }

  private createNewGame(): void {
    this.isLoading = true;
    this.apiService.createNewGate().subscribe(bowlScore => {
      this.bowlScore = bowlScore;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.createNewGame();
  }

  onResetClick(): void {
    const dialogRef = this.dialog.open(NewGameDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.createNewGame();
      }
    });
  }

  private getFrameByIndex(frameIndex: number): Frame | null {
    return frameIndex >= 0 && frameIndex < 10 ? this.bowlScore.frames[frameIndex] : null;
  }

  public getFrameScoreByIndex(frameIndex: number): number {
    const frame = this.getFrameByIndex(frameIndex);
    return frame ? frame.frameScore : 0;
  }

  scoreFrame(score: number): void {
    this.apiService.scoreFrame(score).subscribe(bowlScore => this.bowlScore = bowlScore);
  }
}
