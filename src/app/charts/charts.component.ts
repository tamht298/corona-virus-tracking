import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CoronaSummary} from '../models/corona-summary';
import {Global} from '../models/global';
import {Country} from '../models/country';
import _ from 'lodash';
import {ServerHttpService} from '../services/server-http.service';
import {ChartOptions} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {Criteria} from '../models/criteria.enum';

@Component({
  selector: 'dz-corona-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  summaryData: CoronaSummary;
  globalData: Global;
  countriesData: Country[];
  countriesShowing: Country[];
  chartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {xAxes: [{}], yAxes: [{}]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  chartData = [
    {data: [], label: 'New Confirmed'},
    {data: [], label: 'Total Confirmed'},
    {data: [], label: 'New Deaths'},
    {data: [], label: 'Total Deaths'},
    {data: [], label: 'New Recovered'},
    {data: [], label: 'Total Recovered'}
  ];

  keys = [
    'NewConfirmed',
    'TotalConfirmed',
    'NewDeaths',
    'TotalDeaths',
    'NewRecovered',
    'TotalRecovered'
  ];
  chartLabels = [];
  chartColors = [
    {backgroundColor: '#6E1B09'},
    {backgroundColor: '#D22C2C'},
    {backgroundColor: '#F07249'},
    {backgroundColor: '#5D5F5C'},
    {backgroundColor: '#393A3C'},

  ];
  barChartPlugins = [pluginDataLabels];

  totalCountriesSelected = Array(10).fill(0).map((v, i) => i + 1);
  currentSelectedTotalCountries = 5;
  currentSelectedCriteria = Criteria.TotalConfirmed;

  constructor(private httpService: ServerHttpService) {
  }

  ngOnInit(): void {
    console.log(this.totalCountriesSelected);
    this.httpService.getSummary().subscribe(data => {
      this.summaryData = data;
      this.globalData = this.summaryData?.Global;
      this.countriesData = this.summaryData?.Countries;
      this.buildChart('TotalConfirmed', 5);
    });
  }

  getCountriesWithCriteria(criteria: any, orderBy: string, numberCountry: number) {
    this.countriesShowing = _.orderBy(this.countriesData, criteria, orderBy);
    this.countriesShowing = this.countriesShowing.splice(0, numberCountry);
    return this.countriesShowing;
  }

  drawChart(data: Country[]) {
    let i = 0;
    this.chartLabels.length = 0;
    data.forEach((item) => {
      this.chartLabels.push(item.Country);
    });

    for (let key of this.keys) {
      this.chartData[i].data = [];
      for (let country of this.countriesShowing) {
        this.chartData[i].data.push(country[`${key}`]);
      }
      i++;
    }
  }

  buildChart(criteria: string, numberCountry: number) {
    this.resetChartData();
    let countries = this.getCountriesWithCriteria(criteria, 'desc', numberCountry);
    this.drawChart(countries);
  }


  onChartClick(event) {
    // console.log(event);
  }

  changeTotalCountries(event) {
    this.currentSelectedTotalCountries = +event.target.value || 5;

    this.buildChart(Criteria.TotalConfirmed, this.currentSelectedTotalCountries);
  }

  resetChartData() {
    this.chartData.length = 0;
    this.chartData = [
      {data: [], label: 'New Confirmed'},
      {data: [], label: 'Total Confirmed'},
      {data: [], label: 'New Deaths'},
      {data: [], label: 'Total Deaths'},
      {data: [], label: 'New Recovered'},
      {data: [], label: 'Total Recovered'}
    ];
  }

  changeCriteria(value) {
    this.currentSelectedCriteria = Criteria[this.keys.find(item=>item===value)];
    this.buildChart(this.currentSelectedCriteria, this.currentSelectedTotalCountries)
  }
}
