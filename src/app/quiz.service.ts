import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  loadQuizzes = (): any[] => {
    const quizzesFromWeb = [
        {
            name: 'Quiz 1',
            questions: [
                {
                    name:'Question 1',
                }, 
                {
                    name:'Question 2',
                }
            ]
        }, 
        
        {
            name: 'Quiz 2',
            questions: []
        }
    ];

    return quizzesFromWeb;
  }
}
