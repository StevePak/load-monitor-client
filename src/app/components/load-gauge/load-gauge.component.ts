import { Component, OnInit } from '@angular/core';
import { ServerLoadService } from 'src/app/services/server-load.service';

@Component({
  selector: 'app-load-gauge',
  templateUrl: './load-gauge.component.html',
  styleUrls: ['./load-gauge.component.css']
})
export class LoadGaugeComponent implements OnInit {
  cpuLoad: number;

  constructor(private serverLoadService: ServerLoadService) { }

  ngOnInit() {
    this.serverLoadService.getLoadAverage().subscribe(load => this.cpuLoad = load);
  }

}
