import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// 특정 언어일 경우
const textSplitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
  chunkSize: 200,
  chunkOverlap: 100,
  separators: ["\n\n", "\n"],
});

export const split = async (doc: Document<Record<string, any>>[]) => await textSplitter.splitDocuments(doc);
