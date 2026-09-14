import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { firstValueFrom } from "rxjs";

export const NotAuthenticatedGuard: CanMatchFn = async (
    route: Route,
    segments: UrlSegment[]
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const isAuthenticated = await firstValueFrom(authService.checkStatus());

    if(isAuthenticated){
        router.navigateByUrl('game-question-answer/question-game');
        return false;
    }

    return true;
};