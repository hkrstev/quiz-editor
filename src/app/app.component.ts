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
    
    constructor(private quizSvc: QuizService) {}

    errorLoadingQuizzes = false;
      

    loadQuizzesFromCloud = async () => {

        try {  
            const quizzes = await this.quizSvc.loadQuizzes() ?? [];    
        console.log(quizzes);
        this.quizzes = quizzes.map(x => ({
            quizName: x.name,
            quizQuestions: x.questions.map(y => ({
                questionText: y.name
        }))
        , markedForDelete: false
    }))

        } catch (err) {
            console.error(err);
            this.errorLoadingQuizzes = true;
    };
    }
 
    ngOnInit () {

        this.loadQuizzesFromCloud();
 
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

    jsPromisesOne = () => {
        const n = this.quizSvc.getMagicNumber(false);
        console.log(n);

        n.then(
            number => {
                console.log(number);

                const n2 = this.quizSvc.getMagicNumber(true);
                console.log(n2);

                n2.then(x=> console.log(x)).catch(e=> console.error(e));
            }
        ).catch(
            err => {
                console.error(err);
            }
        )
    };

    jsPromisesTwo = async () => {

        try {
            const x = await this.quizSvc.getMagicNumber(true);
            console.log(x);  

            const y = await this.quizSvc.getMagicNumber(true);
            console.log(y); 
        } catch (err) {
            console.error(err);
        }
    };

    jsPromisesThree   = async () => {

        try {
            const x = this.quizSvc.getMagicNumber(true);
            console.log(x); 
            const y = this.quizSvc.getMagicNumber(true);
            console.log(y);   

            const results = await Promise.all([x, y]);
            // const results = await Promise.race([x, y]);
            console.log(results);
        } catch (err) {
            console.error(err);
        }
    };
        
    };
