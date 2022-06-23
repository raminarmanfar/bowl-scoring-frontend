import {Injectable} from '@angular/core';
import {Frame} from '../models/frame';
import {StepEnum} from '../models/step.enum';
import {RoundStatusEnum} from '../models/round-status.enum';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private readonly MAX_SCORE = 10;
  public readonly LAST_FRAME_INDEX = 9;

  private frames: Frame[];
  private currentFrameIndex: number;
  private currentRound: StepEnum;
  private keypadValueThreshold: number;
  private gameOver: boolean;
  private lastFrameBlockVisible: boolean;

  constructor() {
    this.resetScoring();
  }

  public get isGameOver(): boolean {
    return this.gameOver;
  }

  public get isLastFrameBlockVisible(): boolean {
    return this.lastFrameBlockVisible;
  }

  public resetScoring(): void {
    this.currentFrameIndex = 0;
    this.currentRound = StepEnum.FIRST;
    this.keypadValueThreshold = this.MAX_SCORE;
    this.gameOver = false;
    this.lastFrameBlockVisible = false;

    this.frames = [];
    for (let i = 0; i <= this.LAST_FRAME_INDEX; i++) {
      this.frames.push({
        frameIndex: i,
        roundStatus: RoundStatusEnum.NULL,
        firstRoundScore: -1,
        secondRoundScore: -1,
        thirdRoundScore: -1,
        frameScore: 0,
        isScored: false
      });
    }
  }

  public getValueThreshold(): number {
    return this.keypadValueThreshold;
  }

  public get allFrames(): Frame[] {
    return this.frames;
  }

  public getCurrentFrameId(): number {
    return this.currentFrameIndex;
  }

  public getCurrentRound(): StepEnum {
    return this.currentRound;
  }

  private getFrameByIndex(frameIndex: number): Frame | null {
    return frameIndex >= 0 && frameIndex < 10 ? this.frames[frameIndex] : null;
  }

  private strikesScoring(): void {
    this.frames.forEach(currentFrame => {
      if (!currentFrame.isScored && currentFrame.roundStatus === RoundStatusEnum.STRIKE) {
        const previousFrameScore = this.getFrameScoreByIndex(currentFrame.frameIndex - 1);
        const nextFrame = this.getFrameByIndex(currentFrame.frameIndex + 1);
        // last frame calculation has exceptional status after index 8
        if (currentFrame.frameIndex === 8 && nextFrame && nextFrame.firstRoundScore > -1 && nextFrame.secondRoundScore > -1) {
          currentFrame.isScored = true;
          currentFrame.frameScore = this.MAX_SCORE + previousFrameScore + nextFrame.firstRoundScore + nextFrame.secondRoundScore;
        } else {
          currentFrame.frameScore = this.MAX_SCORE + previousFrameScore;
          if (nextFrame) {
            switch (nextFrame.roundStatus) {
              case RoundStatusEnum.STRIKE:
                const secondNextFrame = this.getFrameByIndex(nextFrame.frameIndex + 1);
                if (secondNextFrame) {
                  if (secondNextFrame.roundStatus === RoundStatusEnum.STRIKE) {
                    currentFrame.frameScore += 2 * this.MAX_SCORE;
                    currentFrame.isScored = true;
                  } else if (secondNextFrame.firstRoundScore > -1) {
                    currentFrame.frameScore += this.MAX_SCORE + secondNextFrame.firstRoundScore;
                    currentFrame.isScored = true;
                  }
                }
                break;
              case RoundStatusEnum.SPARE:
                currentFrame.isScored = true;
                currentFrame.frameScore += this.MAX_SCORE;
                break;
              default:
                if (nextFrame.firstRoundScore > -1 && nextFrame.secondRoundScore > -1) {
                  currentFrame.isScored = true;
                  currentFrame.frameScore = this.MAX_SCORE + nextFrame.firstRoundScore + nextFrame.secondRoundScore + previousFrameScore;
                }
            }
          }
        }
      }
    });
  }

  public getFrameScoreByIndex(frameIndex: number): number {
    const frame = this.getFrameByIndex(frameIndex);
    return frame ? frame.frameScore : 0;
  }

  private lastFrameScoring(score: number, currentFrame: Frame): void {
    if (score > this.MAX_SCORE) {
      throw new Error('Score could not be grater that ' + this.MAX_SCORE);
    }

    switch (this.currentRound) {
      case StepEnum.FIRST:
        if (score === this.MAX_SCORE) {
          this.lastFrameBlockVisible = true;
          currentFrame.roundStatus = RoundStatusEnum.STRIKE;
        } else {
          this.keypadValueThreshold = this.MAX_SCORE - score;
        }
        currentFrame.firstRoundScore = score;
        this.currentRound = StepEnum.SECOND;
        break;
      case StepEnum.SECOND:
        currentFrame.secondRoundScore = score;
        this.strikesScoring();
        this.gameOver = currentFrame.roundStatus === RoundStatusEnum.NULL && score + currentFrame.firstRoundScore < this.MAX_SCORE;
        if (this.gameOver) {
          currentFrame.isScored = true;
          currentFrame.frameScore = score + currentFrame.firstRoundScore + this.getFrameScoreByIndex(currentFrame.frameIndex - 1);
        }
        if (score === this.MAX_SCORE || score + currentFrame.firstRoundScore === this.MAX_SCORE) {
          this.lastFrameBlockVisible = true;
          currentFrame.roundStatus = RoundStatusEnum.SPARE;
          this.keypadValueThreshold = this.MAX_SCORE;
        } else {
          this.keypadValueThreshold = this.MAX_SCORE - score;
        }
        this.currentRound = StepEnum.THIRD;
        break;
      case StepEnum.THIRD:
        this.keypadValueThreshold = this.MAX_SCORE;
        currentFrame.thirdRoundScore = score;
        currentFrame.isScored = true;
        currentFrame.frameScore = this.getFrameScoreByIndex(currentFrame.frameIndex - 1) +
          currentFrame.firstRoundScore + currentFrame.secondRoundScore + currentFrame.thirdRoundScore;
        this.gameOver = true;
    }
  }

  public scoreFrame(score: number): void {
    if (score > this.MAX_SCORE) {
      throw new Error('Score could not be grater than ' + this.MAX_SCORE);
    }
    if (this.gameOver) {
      return;
    }

    const currentFrame = this.frames[this.currentFrameIndex];
    const previousFrame = this.getFrameByIndex(this.currentFrameIndex - 1);

    if (previousFrame && !previousFrame.isScored && previousFrame.roundStatus === RoundStatusEnum.SPARE) {
      previousFrame.isScored = true;
      previousFrame.frameScore += this.MAX_SCORE + score + this.getFrameScoreByIndex(previousFrame.frameIndex - 1);
    }

    if (this.currentFrameIndex === this.LAST_FRAME_INDEX) {
      this.lastFrameScoring(score, currentFrame);
    } else if (score === this.MAX_SCORE) {
      currentFrame.roundStatus = this.currentRound === StepEnum.FIRST ? RoundStatusEnum.STRIKE : RoundStatusEnum.SPARE;
      this.keypadValueThreshold = this.MAX_SCORE;
      this.currentFrameIndex++;
      this.gameOver = this.currentFrameIndex === this.MAX_SCORE;
      this.currentRound = StepEnum.FIRST;
    } else {
      switch (this.currentRound) {
        case StepEnum.FIRST:
          this.keypadValueThreshold = this.MAX_SCORE - score;
          currentFrame.firstRoundScore = score;
          break;
        case StepEnum.SECOND:
          this.keypadValueThreshold = this.MAX_SCORE;
          if (score + currentFrame.firstRoundScore === this.MAX_SCORE) {
            currentFrame.roundStatus = RoundStatusEnum.SPARE;
          } else {
            currentFrame.secondRoundScore = score;
            this.strikesScoring();
            currentFrame.frameScore = score + currentFrame.firstRoundScore +
              this.getFrameScoreByIndex(this.currentFrameIndex - 1);
            currentFrame.isScored = true;
          }
          this.currentFrameIndex++;
          this.gameOver = this.currentFrameIndex === this.LAST_FRAME_INDEX + 1;
          break;
      }
      this.currentRound = this.currentRound === StepEnum.FIRST ? StepEnum.SECOND : StepEnum.FIRST;
    }

    this.strikesScoring();
  }
}
