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
    const res = this.bitcoinService.getMarketPrice()
    console.log('res', res);
    this.subscription = this.bitcoinService.marketPrice$.subscribe(res => {
      this.marketPrice = res

    })
    console.log('this.markterPrice', this.marketPrice);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
