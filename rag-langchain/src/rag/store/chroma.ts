import { Chroma } from "@langchain/community/vectorstores/chroma";
import type { OllamaEmbeddings } from "@langchain/ollama";

export const chroma = (embeddings: OllamaEmbeddings) => {
  console.log(embeddings);
  return new Chroma(embeddings, {
    collectionName: "my_documents",
    url: process.env.CHROMA_URI, // 로컬 경로
  });
};
