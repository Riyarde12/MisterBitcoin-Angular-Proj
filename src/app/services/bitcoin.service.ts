import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, of, Subscription } from 'rxjs';
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

  private MARKET_PRICE_KEY: string = 'marketPrice'
  private _marketPrice$ = new BehaviorSubject<object>(this.storageService.loadFromStorage(this.MARKET_PRICE_KEY) || null)
  public marketPrice$ = this._marketPrice$.asObservable()

  public getRate(coins: number) {
    return this.http.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
      .pipe(map(res => {
        // console.log('res', res);
        return res
      }))
  }

  public getMarketPrice(): Promise<object> {
    // try {
    // let marketPrice = this.storageService.loadFromStorage(this.MARKET_PRICE_KEY)
    // if (!marketPrice || !marketPrice.length) {
    // console.log('hey');
    // return this.http.get('https://api.blockchain.info/charts/avg-blocksize?timespan=5months&format=json&cors=true').pipe(map(res => {
    //   console.log('res', res)
    //   return res
    // }))
    const res = axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
    // console.log('res', res);
    return res

    // }
    // } catch (err) {
    //   console.log('Cannot get market price', err);

    // }
  }

}
