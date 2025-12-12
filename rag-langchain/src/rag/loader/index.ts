import { resolve, extname } from "path";
import type { Document as LangchainDocument } from "@langchain/core/documents";
import { Document as LlamaDocument } from "@llamaindex/core/schema";

import { PDFReader } from "@llamaindex/readers/pdf";
import { CSVReader } from "@llamaindex/readers/csv";
import { TextFileReader } from "@llamaindex/readers/text";
import { DocxReader } from "@llamaindex/readers/docx";
import { HTMLReader } from "@llamaindex/readers/html";
import { ImageReader } from "@llamaindex/readers/image";
import { JSONReader } from "@llamaindex/readers/json";
import { MarkdownReader } from "@llamaindex/readers/markdown";
import { ObsidianReader } from "@llamaindex/readers/obsidian";

const readerMap = {
  ".pdf": PDFReader,
  ".csv": CSVReader,
  ".txt": TextFileReader,
  ".md": MarkdownReader,
  ".docx": DocxReader,
  ".html": HTMLReader,
  ".htm": HTMLReader,
  ".jpg": ImageReader,
  ".jpeg": ImageReader,
  ".png": ImageReader,
  ".gif": ImageReader,
  ".json": JSONReader,
} as const;

export type ReaderKeys = keyof typeof readerMap | undefined;

export const llamaToLangchain = (documents: LlamaDocument[]): LangchainDocument[] => {
  return documents.map((e) => ({
    pageContent: e.text,
    metadata: {
      metadata: e.metadata,
    },
  }));
};

export const getDirectory = (path: string) => resolve(import.meta.dir, path);

function getFullExtension(filename: string): ReaderKeys {
  let ext = extname(filename);
  if (ext.indexOf("?") !== -1) {
    ext = ext.slice(0, ext.indexOf("?")) as keyof typeof readerMap;
  }
  return ext in readerMap ? (ext as ReaderKeys) : undefined;
}

export const loadData = async (path: string) => {
  const ext = getFullExtension(path);
  if (ext) {
    const reader = new readerMap[ext]();
    const documents = await reader.loadData(getDirectory(path));
    return llamaToLangchain(documents);
  } else {
    throw new Error("지원하지 않는 파일입니다.");
  }
};
