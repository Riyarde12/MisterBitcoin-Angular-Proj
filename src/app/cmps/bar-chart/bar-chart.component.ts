import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { mergeWith, timestamp } from 'rxjs';

// import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() marketPrice: { x: number, y: number }[]
  @Input() tradesVolume: { x: number, y: number }[]


  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    // plugins: {
    //   legend: {
    //     display: true,
    //   },
    //   datalabels: {
    //     anchor: 'end',
    //     align: 'end'
    //   }
    // }

  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    // DataLabelsPlugin
  ];

  ngOnInit(): void {
    this.getXValue()
    this.tradesVolumeForDisplay()
  }

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      // { data: [65, 59, 80, 81, 56, 55, 40, 100], label: 'Series A' },
      { data: [65, 59, 80, 81, 56, 55, 40, 100], label: 'USD' },

    ]
  };


  tradesVolumeForDisplay() {
    if (!this.tradesVolume) return
    const dates = this.tradesVolume.map((item) => {
      return new Date(item.x * 1000).toDateString()
    })
    this.barChartData.labels = dates
    console.log('dates', dates);
    const data = this.tradesVolume.map((item) => item.y)
    console.log('data', data);
    this.barChartData.datasets[0].data = data
  }

  getXValue() {
    if (!this.marketPrice) return
    let timeStamps = this.marketPrice.map((item: { x: number, y: number }) => item.x)
    let values = timeStamps.map((timeStamp: number) => new Date(timeStamp * 1000).toDateString())
    this.barChartData.labels = values
    this.barChartData.datasets[0].data = this.marketPrice.map(item => item.y)
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {

  }
}