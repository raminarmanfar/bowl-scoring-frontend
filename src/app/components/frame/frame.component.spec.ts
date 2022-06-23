import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FrameComponent} from './frame.component';
import {RoundStatusEnum} from '../../models/round-status.enum';

describe('FrameComponent', () => {
  let component: FrameComponent;
  let fixture: ComponentFixture<FrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrameComponent);
    component = fixture.componentInstance;
    component.frame = {
      frameIndex: 0,
      isScored: true,
      firstRoundScore: 3,
      secondRoundScore: 6,
      thirdRoundScore: -1,
      frameScore: 9,
      roundStatus: RoundStatusEnum.NULL
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
