import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { userCredentialsRegisterDto } from '../../interfaces/userdto.interface';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);
  isLoadingReg = signal(false);
  isLoading = signal(false);

  authService = inject(AuthService);  

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(6), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    identification: ['', [Validators.required]]
  });


  ngOnInit(): void {
  }

  onSubmit() {    
    if(this.loginForm.invalid){
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);  
      return;
    }

    const {name = '', lastName = '', identification = 0, email = '', password = ''} = this.loginForm.value;

    var data = new userCredentialsRegisterDto();
    data.name = name! + ' ' + lastName!;
    data.identificationNumber = +identification!;
    data.email = email!;
    data.password = password!;

    this.isLoadingReg.set(true);
    this.authService.registerUser(data)
      .subscribe((isAuthenticated) => {
        if(isAuthenticated){
          this.router.navigateByUrl('/register-subjects');
          return;
        }

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
  
}
