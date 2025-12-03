import { Controller, Post, Body, Sse, MessageEvent } from '@nestjs/common';
import { RagService } from './rag.service';
import { Observable } from 'rxjs';

@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @Post()
  async chat(@Body('question') question: string) {
    if (!question) return { error: "Missing 'question'." };
    const answer = await this.ragService.ask(question);
    return { answer };
  }

  @Post('stream')
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
        for await (const chunk of this.ragService.stream(question)) {
          subscriber.next({ data: chunk as string });
        }
        subscriber.complete();
      })();
    });
  }
}
