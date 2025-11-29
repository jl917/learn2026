import { Controller, Post, Body, Sse, MessageEvent } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Observable } from 'rxjs';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body('question') question: string) {
    if (!question) return { error: "Missing 'question'." };
    const answer = await this.chatService.ask(question);
    return { answer };
  }

  @Sse('stream')
  stream(@Body('question') question: string): Observable<MessageEvent> {
    if (!question) {
      return new Observable((subscriber) => {
        subscriber.next({ data: JSON.stringify("Missing 'question'.") });
        subscriber.complete();
      });
    }

    return new Observable<MessageEvent>((subscriber) => {
      void (async () => {
        for await (const chunk of this.chatService.stream(question)) {
          subscriber.next({ data: chunk as string });
        }
        subscriber.complete();
      })();
    });
  }
}
