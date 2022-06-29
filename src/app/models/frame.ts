import {RoundStatusEnum} from './round-status.enum';

export class Frame {
  public id: number;
  public roundStatus: RoundStatusEnum;
  public firstRoundScore: number;
  public secondRoundScore: number;
  public thirdRoundScore: number;
  public frameScore: number;
  public scored: boolean;
}
