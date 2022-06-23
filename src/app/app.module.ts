import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './material-module';

import { AppComponent } from './components/app-component/app.component';
import { ScoringBoardComponent } from './components/scoring-board/scoring-board.component';
import { FrameComponent } from './components/frame/frame.component';
import { KeyPadComponent } from './components/key-pad/key-pad.component';
import {ScoreService} from './services/score.service';
import { NewGameDialogComponent } from './components/new-game-dialog/new-game-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoringBoardComponent,
    FrameComponent,
    KeyPadComponent,
    NewGameDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialsModule
  ],
  providers: [ScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
