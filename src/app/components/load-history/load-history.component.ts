import { Component, OnInit } from '@angular/core';
import { ServerLoadService } from 'src/app/services/server-load.service';
import { D3MultiData } from 'src/app/model/d3-multi-data';

@Component({
  selector: 'app-load-history',
  templateUrl: './load-history.component.html',
  styleUrls: ['./load-history.component.css']
})
export class LoadHistoryComponent implements OnInit {

  data: D3MultiData[] = [
    {
      name: 'CPU Load',
      series: []
    }
  ];

  colorScheme = {
    domain: ['green']
  };

  xAxis() {
    if (this.data[0].series.length > 30) {
      return false;
    }
    else {
      return true;
    }
  }

  constructor(private serverLoadService: ServerLoadService) { }

  ngOnInit() {
    this.serverLoadService.getLoadAverage().subscribe(load => {
      const today = new Date();
      const time = today.getHours() + ":" + today.getMinutes().toString().padStart(2, '0') + ":" + today.getSeconds().toString().padStart(2, '0');
      let series = this.data[0].series;
      series.push({ name: time, value: load });
      if (series.length > 60) {
        series.shift();
      }
      this.data[0].series = series;
      this.data = [...this.data];
    });
  }

}
