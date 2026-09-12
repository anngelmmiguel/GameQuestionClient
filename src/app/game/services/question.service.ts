import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { answerDto, answerGameDto, categoryDto, createAnswerDto, createQuestionDto, gameIdDto, questionDto, roundDto } from '../interfaces/question-game.interface';


const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private http = inject(HttpClient);
  

  GetCategories(): Observable<categoryDto[]> {
    const token = localStorage.getItem('tokenRegister');
    if(!token) {
      return of([]);
    }

    return this.http.get<categoryDto[]>(`${baseUrl}/api/category`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  CreateQuestion(createQuestionDto: createQuestionDto): Observable<questionDto> {
  
      const token = localStorage.getItem('tokenRegister');
      if(!token) {
        return of();
      }
  
      return this.http.post<questionDto>(`${ baseUrl }/api/question`, 
        createQuestionDto ,
        {headers: {
          Authorization: `Bearer ${token}`
        }}
      );
    }


    CreateAnswer(createAnswerDto: createAnswerDto): Observable<answerDto> {
  
      const token = localStorage.getItem('tokenRegister');
      if(!token) {
        return of();
      }
  
      return this.http.post<answerDto>(`${ baseUrl }/api/answer`, 
        createAnswerDto,
        {headers: {
          Authorization: `Bearer ${token}`
        }}
      );
    }


    GetQuestions(): Observable<questionDto[]> {
      const token = localStorage.getItem('tokenRegister');
      if(!token) {
        return of([]);
      }
  
      return this.http.get<questionDto[]>(`${baseUrl}/api/question`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }


  GetAnswers(): Observable<answerDto[]> {
      const token = localStorage.getItem('tokenRegister');
      if(!token) {
        return of([]);
      }
  
      return this.http.get<answerDto[]>(`${baseUrl}/api/answer`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  }


  GetRoundsByIdUser(): Observable<roundDto> {
      const token = localStorage.getItem('tokenRegister');
      if(!token) {
        return of();
      }
  
      return this.http.get<roundDto>(`${baseUrl}/api/game/GetRoundByIdUser`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  }


  StartGame(): Observable<roundDto> {
      const token = localStorage.getItem('tokenRegister');
      if(!token) {
        return of();
      }
  
      return this.http.post<roundDto>(`${baseUrl}/api/game/StartGame`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  }


  GetAnswersByIdQuestion(idQuestion: number): Observable<answerDto[]> {
      const token = localStorage.getItem('tokenRegister');
      if(!token) {
        return of([]);
      }
  
      return this.http.get<answerDto[]>(`${baseUrl}/api/answer/GetByIdQuestion/${idQuestion}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  }


  AnswerGame(answerGameDto: answerGameDto): Observable<roundDto> {
      const token = localStorage.getItem('tokenRegister');
      if(!token) {
        return of();
      }
  
      return this.http.post<roundDto>(`${baseUrl}/api/game/AnswerGame`, answerGameDto, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  }

  NextRound(gameIdDto: gameIdDto): Observable<roundDto> {
      const token = localStorage.getItem('tokenRegister');
      if(!token) {
        return of();
      }
  
      return this.http.post<roundDto>(`${baseUrl}/api/game/NextRound`, gameIdDto, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  }

}
