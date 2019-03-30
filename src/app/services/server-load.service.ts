import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerLoadService {
  constructor(private socket: Socket) { }

  getLoadAverage(): Observable<number> {
    return this.socket.fromEvent('ServerLoad');
  }
}
