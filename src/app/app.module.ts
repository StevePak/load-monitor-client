import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { LoadGaugeComponent } from './components/load-gauge/load-gauge.component';
import { LoadHistoryComponent } from './components/load-history/load-history.component';
import { MessageHistoryComponent } from './components/message-history/message-history.component';

const config: SocketIoConfig = { url: 'http://localhost:4001', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoadGaugeComponent,
    LoadHistoryComponent,
    MessageHistoryComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
