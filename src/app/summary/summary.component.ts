import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ServerHttpService} from '../services/server-http.service';
import _ from 'lodash';
import {CoronaSummary} from '../models/corona-summary';
import {Country} from '../models/country';

@Component({
  selector: 'dz-corona-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnChanges {

  @Input() summaryData: CoronaSummary;
  globalData: any;
  countriesData: Country[] = [];

  constructor(private serverHttpService: ServerHttpService) {
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.globalData = this.summaryData?.Global;
    this.countriesData = this.summaryData?.Countries;
  }

  ngOnInit(): void {

  }

  sortBy(key, dir) {
    this.countriesData = _.orderBy(this.countriesData, key, dir);
  }
}
