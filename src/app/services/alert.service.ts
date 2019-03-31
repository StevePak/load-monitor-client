import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../model/message';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  messages:Message[] = [];
  messagesObservable:BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>(this.messages);

  constructor(private toastr: ToastrService) { }

  showSuccess(title: string, message: string):void {
    this.toastr.clear();
    this.toastr.success(message, title);
    this.messages.push({
      title,
      message,
      timestamp: new Date()
    });
    this.messagesObservable.next(this.messages);
  }

  showError(title: string, message: string):void {
    this.toastr.clear();
    this.toastr.error(message, title, { disableTimeOut: true, tapToDismiss: false});
    this.messages.push({
      title,
      message,
      timestamp: new Date()
    });
    this.messagesObservable.next(this.messages);
  }

  getMessages():Observable<Message[]> {
    return this.messagesObservable;
  }
}
