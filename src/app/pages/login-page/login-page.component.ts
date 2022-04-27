import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Login, Signup, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService) { }

  loggedInUser: Observable<User>
  subscription: Subscription
  isUserSignup: boolean = false

  ngOnInit(): void {

    this.loggedInUser = this.userService.user$
  }

  onLogin(form: NgForm) {
    console.log('form', form.value);
    this.userService.login(form.value as Login)
    form.reset()
  }

  onSignup(value: object) {
    this.userService.signUp(value as Signup)
  }

  onLogOut() {
    this.userService.logOut()
  }

  onUserSelect() {
    this.isUserSignup = !this.isUserSignup
  }

  ngOnDestroy(): void {

  }

}
