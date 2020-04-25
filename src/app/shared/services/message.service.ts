import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageType } from '../models/general.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private currentMessage: { message: string, type: MessageType };
  private messageListener = new Subject<{ message: string, type: MessageType }>();

  constructor() { }

  getMessageListener() {
    return this.messageListener.asObservable();
  }

  setMessage(message: string, type: MessageType) {
    this.currentMessage = {
      message,
      type
    };
    this.messageListener.next(this.currentMessage);
  }

  clearMessage() {
    this.currentMessage = null;
    this.messageListener.next();
  }
}
