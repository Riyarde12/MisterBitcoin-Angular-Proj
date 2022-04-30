import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Login, Move, Signup, User } from '../models/user.model';
import { LocalStorageService } from './storage.service';


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

  private LOGGED_IN_USER: string = 'loggedInUser'
  private USERS_KEY: string = 'users'

  private _gUsers: User[] = []
  private _user$ = new BehaviorSubject<User>(this.storageService.loadFromStorage(this.LOGGED_IN_USER) || null)
  public user$ = this._user$.asObservable()

  constructor(private storageService: LocalStorageService) { }

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
      this._gUsers.push(newUser)
      this.storageService.saveToStorage(this.USERS_KEY, this._gUsers)
    } else throwError(() => 'Cannot signup')
  }

  public login(value: Login) {
    const { username, password } = value
    const users = this.storageService.loadFromStorage(this.USERS_KEY)
    const user: User = users.filter(user => user.username === username && user.password === password)
    if (user) {
      this._user$.next(user as User)
      this.storageService.saveToStorage(this.LOGGED_IN_USER, user)
    } else throwError(() => 'cannot login')
    console.log('user', user);
  }

  public logOut() {
    // this.storageService.saveToStorage(this.LOGGED_IN_USER, '')
    this.storageService.removedFromStorage(this.LOGGED_IN_USER)

    let user: User
    console.log('user', user);
    this._user$.next(user)

  }

  public isAuthenticated(): boolean {
    // console.log('this._user$.getValue(', this._user$.getValue());
    const user = this._user$.value
    return !!user
  }

  public store(key, value) {
    localStorage[key] = JSON.stringify(value);
  }

  public load(key, defaultValue = []) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
  }

  public async updateUserCoins(value: object | any) {
    let { amount } = value
    amount = +amount
    try {
      const [user] = await this.storageService.loadFromStorage(this.LOGGED_IN_USER)
      if (user.coins > amount) {
        user.coins -= amount
        this._user$.next(user as User)
      } else throw new Error('Not enough coins to make a transaction')
    } catch (err) {
      console.log('Cannot transfer coins ', err);

    }
  }

  public addMove(contact: Contact, value: object | any) {
    let { amount } = value
    amount = +amount
    const { _id, name } = contact
    let move: Move = {
      toId: _id,
      to: name,
      at: Date.now(),
      amount,
    }
    return move
  }

  public async saveUser(user: User) {
    console.log('user', user);
    this.storageService.saveToStorage(this.LOGGED_IN_USER as string, user as User)
    this._user$.next(user as User)
  }

}
