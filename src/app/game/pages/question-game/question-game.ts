import { Component, inject, signal } from '@angular/core';
import { answerDto, answerGameDto, gameIdDto, roundDto } from '../../interfaces/question-game.interface';
import { QuestionService } from '../../services/question.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'question-game',
  imports: [UpperCasePipe],
  templateUrl: './question-game.html'
})
export class QuestionGame {
  round = signal<roundDto | null>(null);
  questionService = inject(QuestionService);
  isLoadingReg = signal(false);
  answerList = signal<answerDto[]>([]);
  idAnswer = signal(0);
  continue = signal(false);
  error = signal(false);
  disabled = signal(false);
  endGame = signal(false);

  ngOnInit(): void {  
      this.getRounds();
  }

  getRounds(){
      this.questionService.GetRoundByIdUser()
      .subscribe((res) => {
        //this.isLoading.set(false);        

        if(!res)
          return;

        this.round.set(res);  
        this.GetAnswersByIdQuestion(this.round()!.idQuestion);
        this.validationAnswer(res);

        if(res.answerDto.correct && res.numberRound < 5){
          this.continue.set(true);
          this.disabled.set(true);
        }
        else if(!res.answerDto.correct){
          this.error.set(true);
          this.disabled.set(true);
        }        
        
      })
    }


    GetAnswersByIdQuestion(idQuestion: number){

      this.questionService.GetAnswersByIdQuestion(idQuestion)
      .subscribe((res) => {
        //this.isLoading.set(false);
        this.answerList.set(res);
        const firstQuestion = this.answerList()[0];
        this.idAnswer.set(firstQuestion.id);
      })
    }


    startGame(){
      this.endGame.set(false);
      this.continue.set(false);
      this.disabled.set(false);
      this.error.set(false);
      this.questionService.StartGame()
      .subscribe((res) => {
        //this.isLoading.set(false);
        this.round.set(res);  
        this.GetAnswersByIdQuestion(this.round()!.idQuestion);
      })
    }

    answerGame(){

      var data = new answerGameDto();
      data.idAnswer = this.idAnswer();
      data.idRound = this.round()!.id;


      this.questionService.AnswerGame(data)
      .subscribe((res) => {
        
        this.round.set(res);  
        this.GetAnswersByIdQuestion(this.round()!.idQuestion);

        this.validationAnswer(res);        
      })
    }


    validationAnswer(roundDto: roundDto){

      if(roundDto.idAnswer != null && roundDto.idAnswer != 0){

        if(roundDto.answerDto.correct && roundDto.numberRound < 5){
          this.continue.set(true);
          this.disabled.set(true);
          this.endGame.set(false);
        }
        else if(roundDto.answerDto.correct && roundDto.numberRound == 5){
          this.continue.set(true);
          this.disabled.set(true);
          this.endGame.set(true);
        }
        else if(!roundDto.answerDto.correct){
          this.error.set(true);
          this.disabled.set(true);
          this.endGame.set(true);
        }

      }else {
        this.endGame.set(false);
        this.continue.set(false);
        this.disabled.set(false);
        this.error.set(false);
      } 

    }


    nextRound(){
      var data = new gameIdDto();
      data.idGame = this.round()!.idGame

      this.questionService.NextRound(data)
      .subscribe((res) => {
        //this.continue.set(false);
        //this.disabled.set(false);

        //this.isLoading.set(false);
        this.round.set(res);  
        this.GetAnswersByIdQuestion(this.round()!.idQuestion);

        this.validationAnswer(res); 
      })
    }

    setAnswer(event: any){
      this.idAnswer.set(event.target.value);
    }

}
