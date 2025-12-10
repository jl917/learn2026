import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import type { OllamaEmbeddings } from "@langchain/ollama";

export const store = (embeddings: OllamaEmbeddings) => new MemoryVectorStore(embeddings);
