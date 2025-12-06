import { Injectable } from '@nestjs/common';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOllama } from '@langchain/ollama';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { docs } from './rag-mongo';

@Injectable()
export class RagMongoService {
  private readonly llm: any;
  private readonly chain: any;

  constructor() {
    const OLLAMA_URL = process.env.OLLAMA_URL ?? 'http://localhost:11434';
    const MODEL = process.env.OLLAMA_MODEL ?? 'qwen3:8b';

    this.llm = new ChatOllama({
      baseUrl: OLLAMA_URL,
      model: MODEL,
      temperature: 0.7,
    });

    const system = new SystemMessage(`
### context:
{context}

### 지시
- 질문에 대한 답변은 간결하게 해주세요.
- context에 내용만 기반으로 말씀해주세요
- 한국어로 답변해주세요.
`);

    const prompt = ChatPromptTemplate.fromMessages([
      system,
      new MessagesPlaceholder('messages'),
    ]);

    this.chain = RunnableSequence.from([prompt, this.llm]);
  }

  async ask(question: string): Promise<string> {
    const results = await docs(question);
    const aiMsg = await this.chain.invoke({
      context: results.map((doc) => doc.pageContent).join('\n\n'),
      messages: [new HumanMessage(question)],
    });

    if (typeof aiMsg.content === 'string') return aiMsg.content;
    return aiMsg.content.map((c: any) => c?.text ?? '').join('');
  }

  async *stream(question: string) {
    const results = await docs(question);
    const stream = await this.chain.stream({
      context: results.map((doc) => doc.pageContent).join('\n\n'),
      messages: [new HumanMessage(question)],
    });

    for await (const chunk of stream) {
      const piece =
        typeof chunk.content === 'string'
          ? chunk.content
          : Array.isArray(chunk.content)
            ? chunk.content.map((c: any) => c?.text ?? '').join('')
            : '';

      if (piece) yield piece;
    }
  }
}
