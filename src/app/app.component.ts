import { Component } from '@angular/core';
import { SecondService } from './services/second.service';
import { ThirdService } from './services/third.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'socketrv';
  userName!: string;
  message!: string;
  output: any[] = [];
  feedback!: string;

  constructor(private webSocketService: WebsocketService, private service: SecondService, private third : ThirdService) { }
  ngOnInit(): void {
    // this.webSocketService.listen('typing').subscribe((data) => this.updateFeedback(data));
    // this.webSocketService.listen('chat').subscribe((data) => this.updateMessage(data));
    this.third.openWebSocket();
    this.third.sendMessage('I am here');
  }

  messageTyping(): void {
    this.webSocketService.emit('typing', this.userName);
  }

  sendMessage(): void {
    this.webSocketService.emit('chat', {
      message: this.message,
      handle: this.userName
    });
    this.message = "";
  }
  sendMessageTwo(): void {
    this.third.sendMessage("I'm here")
  }

  updateMessage(data:any) {
    this.feedback = '';
    if(!!!data) return;
    console.log(`${data.handle} : ${data.message}`);
    this.output.push(data);
  }

  updateFeedback(data: any){
    this.feedback = `${data} is typing a message`;
  }
}
