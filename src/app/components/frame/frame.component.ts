import {Component, Input} from '@angular/core';
import {Frame} from '../../models/frame';
import {RoundStatusEnum} from '../../models/round-status.enum';
import {StepEnum} from '../../models/step.enum';

@Component({
  selector: 'app-frame',
  template: `
    <div class="container" [ngClass]="{selectedFrame: currentFrameIndex === frame.frameIndex}">
      <div class="entry-no">{{ frame.frameIndex + 1 }}</div>

      <div class="score-container">
        <div class="score-box">{{ getScoreValue(StepEnum.FIRST) }}</div>
        <div class="score-box score-box-right">{{ getScoreValue(StepEnum.SECOND) }}</div>
        <div class="score-box score-box-right" *ngIf="frame.frameIndex === 9 && isLastFrameVisible">
          {{ getScoreValue(StepEnum.THIRD) }}
        </div>
      </div>
      <div class="frame-score">{{ frame.isScored ? frame.frameScore : '' }}</div>
    </div>
  `,
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent {

  @Input() isLastFrameVisible: boolean;
  @Input() currentFrameIndex: number;
  @Input() frame: Frame;
  readonly StepEnum = StepEnum;

  private static getScore(score: number): string {
    switch (score) {
      case -1:
        return '';
      case 0:
        return '-';
      case 10:
        return 'X';
      default:
        return score.toString();
    }
  }

  getScoreValue(blockStep: StepEnum): string {
    if (this.frame.frameIndex === 9) {
      switch (blockStep) {
        case StepEnum.FIRST:
          return FrameComponent.getScore(this.frame.firstRoundScore);
        case StepEnum.SECOND:
          if (this.frame.firstRoundScore + this.frame.secondRoundScore === 10 || this.frame.secondRoundScore === 10) {
            return '/';
          }
          return FrameComponent.getScore(this.frame.secondRoundScore);
        case StepEnum.THIRD:
          return FrameComponent.getScore(this.frame.thirdRoundScore);
        default: return '';
      }
    } else if (blockStep === StepEnum.SECOND) {
      switch (this.frame.roundStatus) {
        case RoundStatusEnum.STRIKE:
          return 'X';
        case RoundStatusEnum.SPARE:
          return '/';
      }
    }

    const score = blockStep === StepEnum.FIRST ? this.frame.firstRoundScore : this.frame.secondRoundScore;
    return FrameComponent.getScore(score);
  }
}
