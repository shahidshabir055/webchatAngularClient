import { Injectable } from '@angular/core';
export interface Message {
  id: string,
  text? : string
  }
@Injectable({
  providedIn: 'root'
})

export class ThirdService {
  websocket!: WebSocket;
  messages!: Message;
  constructor() { }
  public openWebSocket() {
    this.websocket = new WebSocket('ws:/localhost:3000' );
    this.websocket.onopen = (event) => {
    console.log('Open: ', event);
    this.sendMessage('I am shahid');
    }

    this.websocket.onmessage = (event:any) => {
      const msg = JSON.parse(event);
      this.messages = msg;
      console.log( this.messages );
    }


    this.websocket.onclose = (event) => {
      console.log('Close: ', event);
      // this.websocket = null;
      setTimeout(() => {
        this.openWebSocket( );
    }, 100);
  }
}


    sendMessage(message: any) {
     this.websocket.send(JSON.stringify(message) );
      console.log(message);
    }

    public closeWebSocket() {
    this.websocket.close( );
    this.openWebSocket( );
    }
}







