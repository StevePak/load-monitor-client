import { Component, OnInit } from '@angular/core';
import { ServerLoadService } from 'src/app/services/server-load.service';

@Component({
  selector: 'app-load-history',
  templateUrl: './load-history.component.html',
  styleUrls: ['./load-history.component.css']
})
export class LoadHistoryComponent implements OnInit {
  cpuLoads: number[] = [];

  constructor(private serverLoadService: ServerLoadService) { }

  ngOnInit() {
    this.serverLoadService.getLoadAverage().subscribe(load => {
      this.cpuLoads.push(load);
      if (this.cpuLoads.length > 10) {
        this.cpuLoads.shift();
      }
    });
  }

}
