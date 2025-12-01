import { Injectable } from '@nestjs/common';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOllama } from '@langchain/ollama';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { docs } from './rag';

@Injectable()
export class RagService {
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
You are a helpful assistant that answers questions based on the provided context.

Context:
{context}

Question: {question}

Instructions:
- Answer the question based only on the context provided above
- If the answer is not in the context, say "I don't have enough information to answer that question"
- Be concise and clear in your response
- Cite specific parts of the context when possible

Answer:`);

    const prompt = ChatPromptTemplate.fromMessages([
      system,
      new MessagesPlaceholder('messages'),
    ]);

    this.chain = RunnableSequence.from([prompt, this.llm]);
  }

  async ask(question: string): Promise<string> {
    const results = await docs;
    const aiMsg = await this.chain.invoke({
      context: results.map((doc) => doc.pageContent).join('\n\n'),
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
