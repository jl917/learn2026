import { Injectable } from '@nestjs/common';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOllama } from '@langchain/ollama';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';

@Injectable()
export class ChatService {
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

    const system = new SystemMessage(
      'You are everyday devops bot, a concise DevOps assistant. Answer directly, with examples when useful.',
    );

    const prompt = ChatPromptTemplate.fromMessages([
      system,
      new MessagesPlaceholder('messages'),
    ]);

    this.chain = RunnableSequence.from([prompt, this.llm]);
  }

  async ask(question: string): Promise<string> {
    const aiMsg = await this.chain.invoke({
      messages: [new HumanMessage(question)],
    });

    if (typeof aiMsg.content === 'string') return aiMsg.content;
    return aiMsg.content.map((c: any) => c?.text ?? '').join('');
  }

  async *stream(question: string) {
    const stream = await this.chain.stream({
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
