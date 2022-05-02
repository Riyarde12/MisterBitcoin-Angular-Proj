import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Login, Move, Signup, User } from '../models/user.model';
import { LocalStorageService } from './storage.service';
import { makeId } from '../../Util/utilService'



@Injectable({
  providedIn: 'root'
})
export class UserService {

  // user: User = {
  //   fullname: 'Yarden',
  //   username: 'yarden',
  //   coins: 100,
  //   password: '1234',
  //   moves: []
  // }

  private LOGGED_IN_USER: string = 'loggedInUser'
  private USERS_KEY: string = 'users'

  private _gUsers: User[] = []
  private _user$ = new BehaviorSubject<User>(this.storageService.loadFromStorage(this.LOGGED_IN_USER) || null)
  public user$ = this._user$.asObservable()

  constructor(private storageService: LocalStorageService) { }


  public signUp(value: Signup) {
    const { fullname, username, password } = value
    if (fullname && username && password) {
      const newUser = this.makeUser(fullname, username, password)
      this._gUsers.push(newUser)
      this.storageService.saveToStorage(this.USERS_KEY, this._gUsers)
    } else throwError(() => 'Cannot signup')
  }

  public login(value: Login) {
    const { username, password } = value
    const users = this.storageService.loadFromStorage(this.USERS_KEY)
    const user: User = users.filter((user: User) => user.username === username && user.password === password)
    if (user) {
      this.storageService.saveToStorage(this.LOGGED_IN_USER, user[0])
      this._user$.next(user[0] as User)
    } else throwError(() => 'cannot login')
  }

  public logOut() {
    this.storageService.removedFromStorage(this.LOGGED_IN_USER)
    let user: User
    this._user$.next(user)
  }

  public isAuthenticated(): boolean {
    const user = this._user$.value
    return !!user
  }

  public updateUserCoins(value: object | any) {
    let { amount } = value
    amount = +amount
    try {
      const user = this.storageService.loadFromStorage(this.LOGGED_IN_USER)
      if (user.coins > amount) {
        user.coins -= amount
        this.storageService.saveToStorage(this.LOGGED_IN_USER, user)
        this.saveUser(user)
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
    const user = this.storageService.loadFromStorage(this.LOGGED_IN_USER)
    user.moves.unshift(move)
    console.log('user', user);
    this.storageService.saveToStorage(this.LOGGED_IN_USER, user)
    this.saveUser(user)
  }

  public async saveUser(currUser: User) {
    const idx = this._gUsers.findIndex(user => user._id === currUser._id)
    this._gUsers.splice(idx, 1, currUser)
    this.storageService.saveToStorage(this.USERS_KEY as string, this._gUsers as User[])
    this._user$.next(currUser as User)
  }

  private makeUser(fullname: string, username: string, password: string) {
    var newUser: User = {
      _id: makeId(),
      fullname,
      username,
      password,
      moves: [],
      coins: 100,
    }
    return newUser
  }

}
