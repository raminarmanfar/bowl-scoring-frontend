import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-game-dialog',
  template: `
    <mat-card>
      <mat-card-title>Reset Game</mat-card-title>
      <mat-card-subtitle>Are you sure?</mat-card-subtitle>
      <mat-card-actions align="end">
        <button mat-raised-button color="primary" (click)="onClick('yes')">YES</button>
        <button mat-raised-button color="warn" (click)="onClick('no')">NO</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class NewGameDialogComponent {
  constructor(public dialogRef: MatDialogRef<NewGameDialogComponent>) {
  }

  onClick(answer: string): void {
    this.dialogRef.close(answer);
  }
}
