import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ServerLoadService {
  overload: Date = null;

  constructor(private socket: Socket, private alertService: AlertService) {
    this.socket.on('ServerLoad', data => {
      this.handleNewCpuLoad(data);
    });
  }

  getLoadAverage(): Observable<number> {
    return this.socket.fromEvent('ServerLoad');
  }

  handleNewCpuLoad(load: number): void {
    if (load > 1 && (!this.overload || this.overload < new Date())) {
      const time = new Date().toTimeString().split(' ')[0];
      this.overload = new Date(new Date().getTime() + 120000);
      this.alertService.showError('ALERT', `High load generated an alert - load = ${load.toFixed(4)}, triggered at time ${time}.`)
    } else if (load <= 1 && this.overload > new Date()) {
      this.overload = new Date();
      this.alertService.showSuccess('RECOVERED', 'CPU load has stabilized.')
    }
  }
}
