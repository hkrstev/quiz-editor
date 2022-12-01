import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { repeat, lastValueFrom } from 'rxjs';

interface QuizFromWeb {
  name: string;
  questions: {
    name: string;
  }[];
}

export interface ShapeForSavingEditedQuizzes {
  quiz: string;
  questions: { question: string; }[];
}
​
export interface ShapeForSavingNewQuizzes {
  quizName: string;
  quizQuestions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private angularHttpSvc: HttpClient
  ) { }

  loadQuizzes = () => {

    const quizzesFromWeb = this.angularHttpSvc.get<QuizFromWeb[]>(
      "https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Mystery%20Quiz"
    );

    return lastValueFrom(
      quizzesFromWeb.pipe(repeat(1))
    );
  };

  getMagicNumber = (callerWantsToSucceed: boolean): Promise<number> => {
    return new Promise<number>(
      (resolve, reject) => {

        //
        // Some fancy long running code here...
        //

        // Ultimately resolve if successful.
        if (callerWantsToSucceed) {
          resolve(42);
        }
        // Or reject if failure.
        else {
          reject("Promise was rejected ! ! !");
        }
      }
    );
  };  

  saveQuizzes = (
    changedQuizzes: ShapeForSavingEditedQuizzes[]
    , newQuizzes: ShapeForSavingNewQuizzes[] = []
  ) => {

    let h = new HttpHeaders({
      'Content-Type': 'application/json'
      , 'X-Sas-Token': 'sig=K2WE6NQPtyoV6ke5hwPEaEaW52fgvyFWUeCEdPJls1s'
    });

    return lastValueFrom(
      this.angularHttpSvc.post(
        'https://modern-js.azurewebsites.net/save-quizzes-proxy'
        , JSON.stringify(
          {
            "changedQuizzes": changedQuizzes
            , "newQuizzes": newQuizzes
          }
        )
        , {
          headers: h
        }
      )
    );
  };  
}
