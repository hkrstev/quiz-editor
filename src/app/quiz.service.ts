import { HttpClient } from '@angular/common/http';  
import { Injectable } from '@angular/core';

interface QuizFromWeb {
    name: string;
    questions: {
      name: string;
    }[];
  }

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private angulatHttpClient: HttpClient
  ) { }

  loadQuizzes = () => {
    const quizzesFromWeb = this.angulatHttpClient.get<QuizFromWeb[]>(
        "https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Mystery%20Quiz"
    );
    return quizzesFromWeb;
  };

  getMagicNumber = (callerWantsToSucceed:boolean): Promise<number> => {
    return new Promise<number>(
        (resolve, reject) => {
            if (callerWantsToSucceed) {
                resolve(42);
            } else {
                reject("Error!");
            }
        }
    );
};
}
