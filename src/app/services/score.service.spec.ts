import {TestBed} from '@angular/core/testing';

import {ScoreService} from './score.service';

export function playGame(score: number, service: ScoreService): number {
  let gameRounds = 0;
  while (!service.isGameOver) {
    service.scoreFrame(score);
    gameRounds++;
  }
  return gameRounds;
}

describe('ScoreService', () => {
  let service: ScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should play the best game and got maximum possible score (300)', () => {
    const gameRounds = playGame(10, service);
    expect(gameRounds).toEqual(12);
    expect(service.getFrameScoreByIndex(service.LAST_FRAME_INDEX)).toEqual(300);
  });

  it('should play the worst game and got minimum possible score (0)', () => {
    const gameRounds = playGame(0, service);
    expect(gameRounds).toEqual(20);
    expect(service.getFrameScoreByIndex(service.LAST_FRAME_INDEX)).toEqual(0);
  });

  it('should play always 5 - 5 to get SPARE', () => {
    const gameRounds = playGame(5, service);
    expect(gameRounds).toEqual(21);
    expect(service.getFrameScoreByIndex(service.LAST_FRAME_INDEX)).toEqual(150);
  });

  it('should play always without any SPARE', () => {
    const gameRounds = playGame(3, service);
    expect(gameRounds).toEqual(20);
    expect(service.getFrameScoreByIndex(service.LAST_FRAME_INDEX)).toEqual(60);
  });

  it('should throw an exception because the score is bigger than 10', () => {
    expect(() => service.scoreFrame(11)).toThrowError('Score could not be grater than 10');
  });
});
