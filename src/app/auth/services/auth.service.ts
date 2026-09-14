import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { authenticationDTO } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { userCredentialsRegisterDto, userdto } from '../interfaces/userdto.interface';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');   
  private _user = signal<userdto | null>(null);
  private _token = signal<string | null>(localStorage.getItem('tokenRegister'));

  private http = inject(HttpClient);

  
  checkStatusResource = rxResource({
    stream: () => this.checkStatus()
  })   
  
  
  authStatus = computed<AuthStatus>(() => {
    if(this._authStatus() === 'checking') return 'checking';

    if(this._user()) return 'authenticated'; 
    
    return 'not-authenticated';
  });  

  user = computed<userdto | null>(() => this._user());
  token = computed(this._token);

  login(email: string, password: string): Observable<boolean>{

    return this.http.post<authenticationDTO>(`${ baseUrl }/api/auth/login`, {
      email: email,
      password: password
    }).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )
  }

  
  registerUser(userCredentialsRegisterDTO: userCredentialsRegisterDto, ){
    return this.http.post<authenticationDTO>(`${ baseUrl }/api/auth/register`, {
      //userCredentialsRegisterDTO : userCredentialsRegisterDTO
      identificationNumber: userCredentialsRegisterDTO.identificationNumber,
      password: userCredentialsRegisterDTO.password,
      name: userCredentialsRegisterDTO.name,
      email: userCredentialsRegisterDTO.email //,
      //idAcademicProgram : userCredentialsRegisterDTO.idAcademicProgram
    }).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    );
  }


  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('tokenRegister');
    if(!token) {
      this.logout();
      return of(false);
    }

    return this.http.get<authenticationDTO>(`${baseUrl}/api/auth/Check-Status`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    )
  }


  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set("not-authenticated");

    localStorage.removeItem('tokenRegister');
  }

  private handleAuthSuccess (resp: authenticationDTO){
    this._user.set(resp.userDto);

    this._authStatus.set('authenticated');
    this._token.set(resp.token);

    localStorage.setItem('tokenRegister', resp.token);

    return true;
  }

  private handleAuthError(error : any) { 
    this.logout();
    return of(false);
  }
}
