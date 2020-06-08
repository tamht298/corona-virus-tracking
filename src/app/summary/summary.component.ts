import { Component, OnInit } from '@angular/core';
import {ServerHttpService} from '../services/server-http.service';

@Component({
  selector: 'dz-corona-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  globalData: any;
  countriesData = [];
  constructor(private serverHttpService: ServerHttpService) { }

  ngOnInit(): void {
    this.getSummary();
  }

  getSummary(){
    this.serverHttpService.getSummary().subscribe((data) => {
      this.globalData = data.Global;
      this.countriesData = data.Countries;
    });
  }

}
