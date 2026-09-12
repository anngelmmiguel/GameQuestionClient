import { Component, inject, signal } from '@angular/core';
import { categoryDto, createQuestionDto, questionDto } from '../../interfaces/question-game.interface';
import { QuestionService } from '../../services/question.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'questions',
  imports: [ReactiveFormsModule, UpperCasePipe],
  templateUrl: './questions.html'
})
export class Questions {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);
  isLoadingReg = signal(false);
  idCategory = signal(0);

  questionService = inject(QuestionService);
  listCategories = signal<categoryDto[]>([]);
  listQuestions = signal<questionDto[]>([]);

  loginForm = this.fb.group({
    name: ['', [Validators.required]]
  });

  ngOnInit(): void {  
    //this.isLoading.set(true);
    this.questionService.GetCategories()
      .subscribe((res) => {
        //this.isLoading.set(false);
        this.listCategories.set(res);
        const firstQuestion = this.listCategories()[0];
        this.idCategory.set(firstQuestion.id);
      })

      this.getQuestions();
      
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
    
        var data = new createQuestionDto();
        data.name = name!;
        data.idCategory = this.idCategory();
    
        this.isLoadingReg.set(true);
        this.questionService.CreateQuestion(data)
          .subscribe((res) => {

            this.getQuestions();
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


    setCategory(event: any){
      this.idCategory.set(event.target.value);
    }


    getQuestions(){
      this.questionService.GetQuestions()
      .subscribe((res) => {
        //this.isLoading.set(false);
        this.listQuestions.set(res);
      })
    }
}
