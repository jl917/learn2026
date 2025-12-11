import { Chroma } from "@langchain/community/vectorstores/chroma";
import type { OllamaEmbeddings } from "@langchain/ollama";

/**
 *
 * 샘플코드
 * // const document = { pageContent: s.pageContent, metadata: transformMeta(s.metadata) };
 * // await vectorStore.addDocuments([document]);
 */

export const store = (embeddings: OllamaEmbeddings) => {
  return new Chroma(embeddings, {
    collectionName: "my_documents3",
    url: process.env.CHROMA_URI, // 로컬 경로
  });
};

export const transformMeta = (metadata: Record<string, any>): string[] => {
  return [JSON.stringify([metadata])];
};
