import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="title">Bowl Scoring Demo App</div>
      <div class="subtitle">By Ramin Armanfar</div>
      <app-scoring-board></app-scoring-board>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
