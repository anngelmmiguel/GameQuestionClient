import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);
  isLoadingLogin = signal(false);

  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(6)]]
  });

  onSubmit() {
    if(this.loginForm.invalid){
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);  
      return;
    }

    const {email = '', password = ''} = this.loginForm.value;
    this.isLoadingLogin.set(true);

    this.authService.login(email!, password!)
      .subscribe((isAuthenticated) => {
        if(isAuthenticated){
          this.router.navigateByUrl('/game-question-answer');
          return;
        }

        this.isLoadingLogin.set(false);
        this.hasError.set(true);
        setTimeout(() => {
        this.hasError.set(false);
      }, 2000); 
      })
  }

}
