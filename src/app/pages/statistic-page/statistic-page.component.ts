import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})
export class StatisticPageComponent implements OnInit, OnDestroy {

  constructor(private bitcoinService: BitcoinService) { }

  marketPrice: object
  subscription: Subscription

  ngOnInit(): void {
    // const res = this.bitcoinService.getMarketPrice()
    // const data = res.subscribe(res => {
    //   this.marketPrice = res
    // })
    this.getMarketPrice()
    // console.log('marketPrice', this.marketPrice);
  }

  async getMarketPrice() {
    this.marketPrice = await this.bitcoinService.getMarketPrice()
    console.log('this.marketPrice', this.marketPrice);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
