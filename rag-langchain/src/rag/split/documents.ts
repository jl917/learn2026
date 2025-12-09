import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
});

export const splitDocuments = async (doc: Document<Record<string, any>>[]) => await textSplitter.splitDocuments(doc);
