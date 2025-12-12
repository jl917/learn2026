import type { Document as LangchainDocument } from "@langchain/core/documents";
import { Document as LlamaDocument } from "@llamaindex/core/schema";

export const llamaToLangchain = (documents: LlamaDocument[]): LangchainDocument[] => {
  return documents.map((e) => ({
    pageContent: e.text,
    metadata: {
      metadata: e.metadata,
    },
  }));
};
