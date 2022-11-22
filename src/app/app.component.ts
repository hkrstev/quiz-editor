import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';


interface QuizDisplay {
    quizName: string;
    quizQuestions: QuestionDisplay[];
    markedForDelete: boolean;
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
    title(title: any) {
        throw new Error('Method not implemented.');
    }
    
    constructor(private quizSvc: QuizService) {}

    errorLoadingQuizzes = false;

    ngOnInit () {
        const quizzes = this.quizSvc.loadQuizzes();
        console.log(quizzes);

        quizzes.subscribe(
            data => {
                console.log(data);
                this.quizzes = data.map(x => ({
                    quizName: x.name,
                    quizQuestions: x.questions.map(y => ({
                        questionText: y.name
                }))
                , markedForDelete: false
            }))
            },
             err => {
                console.error(err.error);
                this.errorLoadingQuizzes = true;
            }
        
        );
        // this.quizzes = data.map((x) => ({
        //     quizName: x.name,
        //     quizQuestions: x.questions.map((y:any) => ({
        //         questionText: y.name
        //     }))
        //     , markedForDelete: false
        // }));
        }

    quizzes: QuizDisplay[] = [];

    selectedQuiz: QuizDisplay | undefined = undefined;
    
    selectQuiz = (quizToSelect: QuizDisplay) => {
        this.selectedQuiz = quizToSelect;
    }

    addNewQuiz = () => {
        const newQuiz: QuizDisplay = {
            quizName: 'Untitled Quiz',
            quizQuestions: [],
            markedForDelete: false
        };
        
        this.quizzes = [...this.quizzes, newQuiz];
        this.selectQuiz(newQuiz);
    };

    addNewQuestion = () => {
        if (this.selectedQuiz != undefined) {
            this.selectedQuiz.quizQuestions = [
                ...this.selectedQuiz.quizQuestions,
                {
                    questionText: 'New Question'
                }
            ];
        }
    };

    removeQuestion = (questionToRemove: QuestionDisplay) => {
        if (this.selectedQuiz != undefined) {
            this.selectedQuiz.quizQuestions = this.selectedQuiz.quizQuestions.filter(x => x !== questionToRemove);
        }
    };
        
    };
