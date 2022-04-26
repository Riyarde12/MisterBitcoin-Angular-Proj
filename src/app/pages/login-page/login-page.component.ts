import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Signup } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    console.log('form', form.value);
    form.reset()
  }

  onSignup(value: object) {
    this.userService.signUp(value as Signup)
  }

}
