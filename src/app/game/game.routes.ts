import { Routes } from "@angular/router";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";
import { QuestionGame } from "./pages/question-game/question-game";
import { QuestionGameInit } from "./pages/question-game-init/question-game-init";
import { Questions } from "./pages/questions/questions";
import { Answers } from "./pages/answers/answers";

export const gameRoutes:Routes = [
    {
        path: '',
        component : QuestionGameInit,
        children: [
            {
                path : 'question-game', 
                component: QuestionGame
            },
            {
                path: 'questions',
                component: Questions
            },
            {
                path: 'answers',
                component: Answers
            },
            {
                path: '**',
                redirectTo: 'question-game'
            }
        ],
        canMatch: [
            AuthenticatedGuard
        ]
    }
];

export default gameRoutes;