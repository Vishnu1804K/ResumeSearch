import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

interface ChatMessage {
  type: string;
  postId: string;
  username: string;
  content: string;
  timestamp?: number;
}

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private client: Client | null = null;
  private comments$ = new Subject<ChatMessage>();

  connect(): void {
    if (this.client && this.client.active) {
      return;
    }

    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      onConnect: () => {
        this.client?.subscribe('/topic/comments', (message: IMessage) => {
          const payload = JSON.parse(message.body) as ChatMessage;
          this.comments$.next(payload);
        });
      },
      debug: (msg) => console.log(msg),
    });

    this.client.activate();
  }

  commentsStream(): Observable<ChatMessage> {
    return this.comments$.asObservable();
  }

  sendComment(postId: string, username: string, content: string): void {
    if (!this.client || !this.client.active) {
      this.connect();
    }
    const msg: ChatMessage = {
      type: 'CHAT_MESSAGE',
      postId,
      username,
      content,
    };
    this.client?.publish({
      destination: '/app/chat.sendComment',
      body: JSON.stringify(msg),
    });
  }
}
