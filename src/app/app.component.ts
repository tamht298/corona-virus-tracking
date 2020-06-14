import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ServerHttpService} from './services/server-http.service';
import {CoronaSummary} from './models/corona-summary';

@Component({
  selector: 'dz-corona-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'corona-virus';

  summaryData: CoronaSummary;
  isLoading = true;
  constructor(private serverHttpService: ServerHttpService) {
  }
  ngOnInit(): void {
    this.serverHttpService.getSummary().subscribe((data) => {
      this.summaryData = data;
      this.isLoading = false;
      console.log(data);
    });
  }

}
