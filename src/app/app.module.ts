import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app-component/app.component';
import { FrameComponent } from './components/frame/frame.component';
import { KeyPadComponent } from './components/key-pad/key-pad.component';
import { NewGameDialogComponent } from './components/new-game-dialog/new-game-dialog.component';
import { ScoringBoardComponent } from './components/scoring-board/scoring-board.component';
import { MaterialsModule } from './material-module';
import { ScoreService } from './services/score.service';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ScoringBoardComponent,
    FrameComponent,
    KeyPadComponent,
    NewGameDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialsModule
  ],
  providers: [ScoreService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
