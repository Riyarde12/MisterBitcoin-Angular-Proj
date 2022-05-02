import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})
export class StatisticPageComponent implements OnInit, OnDestroy {

  constructor(
    private bitcoinService: BitcoinService,
  ) { }

  tradesVolume: any
  marketPrice: object
  subscription: Subscription

  ngOnInit(): void {
    this.getMarketPrice()
    this.getTradeVolume()
  }

  getTradeVolume() {
    this.bitcoinService.getTradeVolume().subscribe(vals => {
      console.log('vals from getTradeVolume', vals);
      this.tradesVolume = vals
    })
  }

  getMarketPrice() {
    const obs = this.bitcoinService.getMarketPrice()
    this.subscription = obs.subscribe(vals => {
      console.log('vals from obs, cmp', vals);
      this.marketPrice = vals
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
