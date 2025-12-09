import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import type { OllamaEmbeddings } from "@langchain/ollama";

export const memory = (embeddings: OllamaEmbeddings) => new MemoryVectorStore(embeddings);
