import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private angulatHttpClient: HttpClient
  ) { }

  loadQuizzes = (): any[] => {
    const quizzesFromWeb = [
        {
            
        }, 
        
        {
            name: 'Quiz 2',
            questions: []
        }
    ];

    return quizzesFromWeb;
  }
}
