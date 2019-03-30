import { Component, OnInit } from '@angular/core';

import { ServerLoadService } from 'src/app/services/server-load.service';
import { D3Data } from 'src/app/model/d3-data';

@Component({
  selector: 'app-load-gauge',
  templateUrl: './load-gauge.component.html',
  styleUrls: ['./load-gauge.component.css']
})
export class LoadGaugeComponent implements OnInit {
  data:D3Data[] = [];

  colorScheme = {
    domain: ['green']
  };

  constructor(private serverLoadService: ServerLoadService) { }

  ngOnInit() {
    this.serverLoadService.getLoadAverage().subscribe(load => {
      this.data = [{ name: 'CPU Load', value: load }];
      this.colorScheme = load > 1 ? { domain: ['red'] }: { domain: ['green'] };
    });
  }

}
