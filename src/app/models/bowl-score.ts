import { Frame } from './frame';
import { StepEnum } from './step.enum';

export class BowlScore {
  public frames: Frame[];
  public currentFrameIndex: number;
  public currentRound: StepEnum;
  public keypadValueThreshold: number;
  public gameOver: boolean;
  public lastFrameBlockVisible: boolean;
}
