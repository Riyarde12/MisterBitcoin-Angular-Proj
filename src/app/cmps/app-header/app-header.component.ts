import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, private router: Router) { }

  loggedInUser: User
  subscription: Subscription


  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe(loggedInUser => {
      this.loggedInUser = loggedInUser
    })
  }

  onLogout() {
    this.userService.logOut()
    this.router.navigateByUrl('/login')
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
