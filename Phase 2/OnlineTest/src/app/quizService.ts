
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './questionsModel';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(public http: HttpClient) { }

  checkUserQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>("/assets/questions.json");
  }
}
