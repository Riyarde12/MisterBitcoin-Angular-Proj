import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BitcoinService } from 'src/app/services/bitcoin.service';
// import { BarChartComponent } from 'src/app/cmps/bar-chart/bar-chart.component';
import { LineChartComponent } from 'src/app/cmps/line-chart/line-chart.component';

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})
export class StatisticPageComponent implements OnInit, OnDestroy {

  constructor(
    private bitcoinService: BitcoinService,
    private lineChartComponent: LineChartComponent
  ) { }

  tradesVolume: any
  marketPrice: object
  subscription: Subscription

  ngOnInit(): void {
    const obs = this.bitcoinService.getMarketPrice()
    const subscription = obs.subscribe(vals => {
      console.log('vals from obs, cmp', vals);
      this.marketPrice = vals
    })
    this.getTradeVolume()
    // this.tradesForDisplay()
    // this.getMarketPrice()
    // console.log('marketPrice', this.marketPrice);
  }

  getTradeVolume() {
    this.bitcoinService.getTradeVolume().subscribe(vals => {
      console.log('vals from getTradeVolume', vals);
      this.tradesVolume = vals
    })
    console.log('this.tradesVolume', this.tradesVolume);

    // this.lineChartComponent.lineChartData.datasets = this.tradesVolume
  }

  // tradesForDisplay() {
  //   const timeStamps = this.tradesVolume.map(item => {
  //     console.log('item', item);
  //     return item.x
  //   })
  //   console.log('timeStamps', timeStamps);
  // }


  async getMarketPrice() {
    // this.marketPrice = await this.bitcoinService.getMarketPrice()
    // console.log('this.marketPrice', this.marketPrice);
    // this.barChartComponent.barChartData
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
