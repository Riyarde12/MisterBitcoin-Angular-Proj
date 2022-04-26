import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = {
    fullname: 'Yarden',
    username: 'yarden',
    coins: 100,
    password: '1234',
    moves: []

  }



  private _user$ = new BehaviorSubject<User>({} as User)
  public user$ = this._user$.asObservable()

  constructor() { }


  getUser(): User {
    return {
      fullname: 'Yarden',
      username: 'yarden',
      coins: 100,
      password: '1234',
      moves: []
    }
  }

  public loadUser() {
    let user: User = this.user
    this._user$.next(user)
  }
}
