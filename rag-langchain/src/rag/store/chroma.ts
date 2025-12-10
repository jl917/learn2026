import { Chroma } from "@langchain/community/vectorstores/chroma";
import type { OllamaEmbeddings } from "@langchain/ollama";

export const store = (embeddings: OllamaEmbeddings) => {
  return new Chroma(embeddings, {
    collectionName: "my_documents2",
    url: process.env.CHROMA_URI, // 로컬 경로
  });
};
