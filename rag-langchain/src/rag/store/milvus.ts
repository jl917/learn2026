import { Milvus } from "@langchain/community/vectorstores/milvus";
import type { OllamaEmbeddings } from "@langchain/ollama";

export const store = (embeddings: OllamaEmbeddings) => {
  return new Milvus(embeddings, {
    collectionName: "my_documents",
    url: process.env.MILVUS_ADDRESS, // 로컬 경로
  });
};
