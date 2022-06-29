import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BowlScore} from '../models/bowl-score';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  createNewGate(): Observable<BowlScore> {
    return this.http.get<BowlScore>('/bowl/create-new-game/');
  }

  scoreFrame(score: number): Observable<BowlScore> {
    return this.http.get<BowlScore>('/bowl/score/' + score);
  }

  getGameData(): Observable<BowlScore> {
    return this.http.get<BowlScore>('/bowl/get-game-data/')
  }
}
