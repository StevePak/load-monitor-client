import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Message } from 'src/app/model/message';

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.css']
})
export class MessageHistoryComponent implements OnInit {

  messages: Message[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessages().subscribe(messages =>{
      this.messages = messages;
    });
  }

}
