import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: io.Socket;
  headers2= new HttpHeaders()
  .set('Accept','*/*')
  .set('Access-Control-Allow-Origin', '*')
  .set('Cache-Control','no-cache')
  constructor(private http: HttpClient) {
      this.socket = io.connect("http://localhost:3000");

      console.log("connecting >>>>>>>>>>>>");
  }

  listen(eventname: string) : Observable<any> {
      return new Observable((subscriber) => {
          this.socket.on(eventname, (data: any) => {
              subscriber.next(data);
          })
      })
  }

  emit(eventname: string, data: any) {
      this.socket.emit(eventname, data);
  }

}
