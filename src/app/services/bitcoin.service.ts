import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap, Observable, of, Subscription } from 'rxjs';
import { __values } from 'tslib';
import { LocalStorageService } from './storage.service';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
    // private axios: Axios
  ) { }


  private TRADES_VOLUME: string = 'tradesVolume'
  private MARKET_PRICE_KEY: string = 'marketPrice'

  private _marketPrice$ = new BehaviorSubject<object>(this.storageService.loadFromStorage(this.MARKET_PRICE_KEY) || null)
  public marketPrice$ = this._marketPrice$.asObservable()

  public getRate(coins: number) {
    return this.http.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
      .pipe(map(res => {
        return res
      }))
  }

  public getMarketPrice(): Observable<Array<object>> {
    let marketPrice = this.storageService.loadFromStorage(this.MARKET_PRICE_KEY)
    if (!marketPrice || !marketPrice.length) {
      return this.http.get<{ values }>('https://api.blockchain.info/charts/market-price?timespan=1months&1days&2022year&format=json&cors=true').pipe(
        tap((res) => {
          this.storageService.saveToStorage(this.MARKET_PRICE_KEY, res.values)
        }),
        map(res => {
          console.log('res from service', res)
          return res.values
        }))
    } else {
      return new Observable(observer => {
        observer.next(marketPrice)
      })
    }
  }

  public getTradeVolume(): Observable<Array<{ x: number, y: number }>> {
    let tradesVolume = this.storageService.loadFromStorage(this.TRADES_VOLUME)
    if (!tradesVolume || !tradesVolume.length) {
      return this.http.get<any>('https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true')
        .pipe(
          tap((res) => {
            console.log('res from tap ', res);
            this.storageService.saveToStorage(this.TRADES_VOLUME, res.values)
          }),
          map(res => {
            console.log('res res from map', res.values);
            return res
          })
        )
    } else {
      return new Observable(observer => {
        observer.next(tradesVolume)
      })
    }
  }

}


