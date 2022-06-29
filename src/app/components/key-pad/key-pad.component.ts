import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-key-pad',
  template: `
    <span *ngFor="let number of numbers">
      <button mat-fab color="primary" [ngClass]="{'disabled-cursor': number > disableValueThreshold}"
          [disabled]="isLoading || gameOver || number > disableValueThreshold" class="button"
          (click)="btnClick.emit(number)">{{ number }}</button>
    </span>
  `,
  styleUrls: ['./key-pad.component.scss']
})
export class KeyPadComponent {

  @Input() gameOver = false;
  @Input() isLoading = false;
  @Input() disableValueThreshold: number = 10;
  @Output() btnClick = new EventEmitter<number>();

  readonly numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
