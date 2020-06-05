import {Component, OnInit} from '@angular/core';
import {ServerHttpService} from './services/server-http.service';

@Component({
  selector: 'dz-corona-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'corona-virus';

  constructor(private serverHttpService: ServerHttpService) {
  }
  ngOnInit(): void {
    this.serverHttpService.getSummary().subscribe((data) => {
      console.log(data);
    });
  }
}
