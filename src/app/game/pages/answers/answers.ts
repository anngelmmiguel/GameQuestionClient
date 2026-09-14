import { Component, inject, signal } from '@angular/core';
import { answerDto, categoryDto, createAnswerDto, createQuestionDto, questionDto } from '../../interfaces/question-game.interface';
import { QuestionService } from '../../services/question.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answers',
  imports: [ReactiveFormsModule, UpperCasePipe],
  templateUrl: './answers.html',
})
export class Answers {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);
  isLoadingReg = signal(false);
  idQuestion = signal(0);
  idAnswerVF = signal(true);

  questionService = inject(QuestionService);
  listQuestions = signal<questionDto[]>([]);
  listAnswers = signal<answerDto[]>([]);

  loginForm = this.fb.group({
    name: ['', [Validators.required]]
  });

  ngOnInit(): void {  
      this.getQuestions();
      this.getAnswers();
  }


    onSubmit() {    
        if(this.loginForm.invalid){
          this.hasError.set(true);
          setTimeout(() => {
            this.hasError.set(false);
          }, 2000);  
          return;
        }
    
        const {name = ''} = this.loginForm.value;
    
        var data = new createAnswerDto();
        data.name = name!;
        data.idQuestion = this.idQuestion();
        data.correct = this.idAnswerVF();
    
        
        //----Validación
        if(data.correct && this.listAnswers() != null && this.listAnswers().length > 0){
          var listAnsw = this.listAnswers().filter(x => x.idQuestion == data.idQuestion);
          var contTrue = listAnsw.filter(x => x.correct);
          if(contTrue.length > 0){
            alert("Ya existe una respuesta VERDADERA registrada");
            return;
          }
        }
        
 

        this.isLoadingReg.set(true);
        this.questionService.CreateAnswer(data)
          .subscribe((res) => {

            this.getAnswers();
            this.isLoadingReg.set(false);

            this.hasError.set(true);
            setTimeout(() => {
            this.hasError.set(false);
          }, 2000); 
          },
          (error) => {
            console.log(error);
          })
      }


    setQuestion(event: any){
      this.idQuestion.set(event.target.value);
    }
/*
    setAnswerVF(event: any){
      this.idAnswerVF.set(event.target.value);
    }*/

    setAnswerVF(event: Event) {
      const value = (event.target as HTMLSelectElement).value;
  
      const answer = value === 'true';
      this.idAnswerVF.set(answer);
    }

    getQuestions(){
      this.questionService.GetQuestions()
      .subscribe((res) => {
        //this.isLoading.set(false);
        this.listQuestions.set(res);
        const firstQuestion = this.listQuestions()[0];
        this.idQuestion.set(firstQuestion.id);
      })
    }


    getAnswers(){
      this.questionService.GetAnswers()
      .subscribe((res) => {
        //this.isLoading.set(false);
        this.listAnswers.set(res);        
      })
    }

}
