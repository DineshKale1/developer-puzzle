import { Component } from '@angular/core';
import { APP_CONSTANT } from './constant/app.constant';

@Component({
  selector: 'coding-challenge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title: string = APP_CONSTANT.TITLE;
  public titleMessage: string = APP_CONSTANT.TITLE_MESSAGE;
}

