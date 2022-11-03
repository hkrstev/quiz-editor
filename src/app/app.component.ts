import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
    quizName: string;
    quizQuestions: QuestionDisplay[];
}

interface QuestionDisplay {
    questionText: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
    constructor(private quizSvc: QuizService) {}

    ngOnInit () {
        const data = this.quizSvc.loadQuizzes();
        console.log(data);

        this.quizzes = data.map((x) => ({
            quizName: x.name,
            quizQuestions: x.questions.map((y:any) => ({
                questionText: y.name
            }))
        }));
        }

    quizzes: QuizDisplay[] = [];
    }