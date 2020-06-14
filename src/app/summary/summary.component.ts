import {AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {ServerHttpService} from '../services/server-http.service';
import _ from 'lodash';
import {CoronaSummary} from '../models/corona-summary';
import {Country} from '../models/country';
import {Sort} from '@angular/material';
import {SearchPipe} from '../pipe/search.pipe';

@Component({
  selector: 'dz-corona-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnChanges {

  @Input() summaryData: CoronaSummary;
  globalData: any;
  countriesData: Country[] = [];

  constructor(private serverHttpService: ServerHttpService, private searchPipe: SearchPipe) {
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.globalData = this.summaryData?.Global;
    this.countriesData = this.summaryData?.Countries;
  }

  ngOnInit(): void {

  }

  // sortBy(key, dir) {
  //   this.countriesData = _.orderBy(this.countriesData, key, dir);
  // }
  querySearch: any;


  sortData(sort: Sort) {
    const data = this.countriesData.slice();
    if (!sort.active || sort.direction === '') {
      this.countriesData = data;
      return;
    }
    this.countriesData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Country':
          return this.compare(a.Country, b.Country, isAsc);
        case 'NewConfirmed':
          return this.compare(a.NewConfirmed, b.NewConfirmed, isAsc);
        case 'TotalConfirmed':
          return this.compare(a.TotalConfirmed, b.TotalConfirmed, isAsc);
        case 'NewDeaths':
          return this.compare(a.NewDeaths, b.NewDeaths, isAsc);
        case 'TotalDeaths':
          return this.compare(a.TotalDeaths, b.TotalDeaths, isAsc);
        case 'NewRecovered':
          return this.compare(a.NewRecovered, b.NewRecovered, isAsc);
        case 'TotalRecovered':
          return this.compare(a.TotalRecovered, b.TotalRecovered, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  search(event) {
    this.countriesData = this.searchPipe.transform(this.countriesData, event.target.value);
    console.log(event.target.value)
  }
}
