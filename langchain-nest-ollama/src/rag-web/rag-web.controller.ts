import { Controller, Post, Body, Sse, MessageEvent } from '@nestjs/common';
import { RagWebService } from './rag-web.service';
import { Observable } from 'rxjs';

@Controller('rag-web')
export class RagWebController {
  constructor(private readonly ragWebService: RagWebService) {}

  @Post()
  async chat(@Body('question') question: string) {
    if (!question) return { error: "Missing 'question'." };
    const answer = await this.ragWebService.ask(question);
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
        for await (const chunk of this.ragWebService.stream(question)) {
          subscriber.next({ data: chunk as string });
        }
        subscriber.complete();
      })();
    });
  }
}
