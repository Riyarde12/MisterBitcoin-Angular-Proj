import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { of } from 'rxjs';
import { Contact } from '../models/contact.model';
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

  private USERS_KEY = 'users'

  private _users: User[] = []

  private _user$ = new BehaviorSubject<User>({} as User)
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
      // this.loadUser()
    } else throwError(() => 'Cannot signup')
  }

  public login(value: Login) {
    const { username, password } = value
    if (username && password) {
      const users = this.storageService.load(this.USERS_KEY)
      const user: User = users.filter(user => user.username === username && user.password === password)
      this._user$.next(user)
    } else throwError(() => 'Cannot login')
  }

  public loadUser() {
    let user: User = this.user
    this._user$.next(user)
  }
}
