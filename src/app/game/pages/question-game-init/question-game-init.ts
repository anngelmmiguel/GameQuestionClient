import { Component } from '@angular/core';
import { FrontNavbar } from '../../front-navbar/front-navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'question-game-init',
  imports: [FrontNavbar, RouterOutlet],
  templateUrl: './question-game-init.html'
})
export class QuestionGameInit {

}
