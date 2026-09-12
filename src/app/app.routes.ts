import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes')
    },
    {
        path: 'game-question-answer',
        loadChildren: () => import('./game/game.routes')
    },
    {
        path: '',
        loadChildren: () => import('./auth/auth.routes')
    }
];
