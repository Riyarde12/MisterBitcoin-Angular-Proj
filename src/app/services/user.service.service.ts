import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, throwError } from 'rxjs';
import { Login, Signup, User } from '../models/user.model';
import { StorageService } from './storage-service.service';


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

  private LOGGED_IN_USER = 'loggedInUser'
  private USERS_KEY = 'users'

  private _users: User[] = []

  private _user$ = new BehaviorSubject<User>(this.storageService.load(this.LOGGED_IN_USER) || null)
  public user$ = this._user$.asObservable()

  constructor(private storageService: StorageService) { }

  getUser(): User {
    return {
      fullname: 'Yarden',
      username: 'yarden',
      coins: 100,
      password: '1234',
      moves: []
    }
  }

  public signUp(value: Signup) {
    const { fullname, username, password } = value
    if (fullname && username && password) {
      var newUser: User = {
        fullname,
        username,
        password,
        moves: [],
        coins: 100,
      }
      this._users.push(newUser)
      this.storageService.store(this.USERS_KEY, this._users)
    } else throwError(() => 'Cannot signup')
  }

  public login(value: Login) {
    const { username, password } = value
    console.log('username', username);
    const users = this.storageService.load(this.USERS_KEY)
    console.log('users', users);
    const user: User = users.filter(user => user.username === username && user.password === password)
    if (user) {
      this._user$.next(user as User)
      this.storageService.store(this.LOGGED_IN_USER, user)
    } else throwError(() => 'cannot login')
    console.log('user', user);
  }

  public logOut() {
    this.storageService.store(this.LOGGED_IN_USER, '')
    let user: User
    console.log('user', user);
    this._user$.next(user)

  }

  public isAuthenticated(): boolean {
    // console.log('this._user$.getValue(', this._user$.getValue());
    const user = this._user$.value
    // console.log('username', user.username);
    return !!user
  }


}
