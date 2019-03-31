import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';

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
    BrowserAnimationsModule,
    NgxChartsModule,
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
