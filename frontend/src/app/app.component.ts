import { Component } from '@angular/core';
import {UserService} from './services/user.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // public UserInfo = new BehaviorSubject({});

  // public USerInfoChanges = this.UserInfo as Observable<{}>;

  public userInfo: {} | boolean;

  constructor(private userService: UserService) {
    this.userInfo = this.userService.isUserLoggedIn() && this.userService.getUserInfo();
    console.log(this.userInfo);
  }
}
