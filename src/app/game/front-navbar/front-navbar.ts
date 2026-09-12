import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive, UpperCasePipe],
  templateUrl: './front-navbar.html',
  styleUrl: './front-navbar.css',
})
export class FrontNavbar {
  authService = inject(AuthService);
  router = inject(Router);

  /*
  ngOnInit(): void {
    this.authService.checkStatus()
      .subscribe(res => {
        //var nom = this.authService.user()?.name;
      });    
  }*/

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
    return;
  }

}
