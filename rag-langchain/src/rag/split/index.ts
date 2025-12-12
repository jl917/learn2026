import {
  RecursiveCharacterTextSplitter,
  type RecursiveCharacterTextSplitterParams,
  type SupportedTextSplitterLanguage,
} from "@langchain/textsplitters";

export const recursiveCharacterTextSpliter = (
  doc: any,
  language: SupportedTextSplitterLanguage | undefined = undefined,
  params?: Partial<RecursiveCharacterTextSplitterParams>
) => {
  const newParams = {
    chunkSize: 200,
    chunkOverlap: 100,
    separators: ["\n\n", "\n"],
    ...params,
  };

  let textSplitter: RecursiveCharacterTextSplitter;

  if (language) {
    textSplitter = RecursiveCharacterTextSplitter.fromLanguage(language, newParams);
  } else {
    textSplitter = new RecursiveCharacterTextSplitter(newParams);
  }

  return textSplitter.splitDocuments(doc);
};
