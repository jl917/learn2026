import { Document } from '@langchain/core/documents';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { OllamaEmbeddings } from '@langchain/ollama';

import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import path from 'path';

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const embeddings = new OllamaEmbeddings({
  model: 'nomic-embed-text',
  baseUrl: 'http://localhost:11434',
});

const vectorStore = new MemoryVectorStore(embeddings);

export const documents = [
  new Document({
    pageContent:
      'Dogs are great companions, known for their loyalty and friendliness.',
    metadata: { source: 'mammal-pets-doc' },
  }),
  new Document({
    pageContent: 'Cats are independent pets that often enjoy their own space.',
    metadata: { source: 'mammal-pets-doc' },
  }),
];

const loader = new PDFLoader(path.resolve(__dirname, '../document/ESCPOS.pdf'));

export const docs = loader.load().then(async (doc) => {
  const allSplits = await textSplitter.splitDocuments(doc);

  // console.log(doc.length);
  // console.log(allSplits.length);

  // const vector1 = await embeddings.embedQuery(allSplits[0].pageContent);
  // const vector2 = await embeddings.embedQuery(allSplits[1].pageContent);

  // console.log('Vector 1:', vector1);
  // console.log('Vector 2:', vector2);

  await vectorStore.addDocuments(allSplits);

  const results1 = await vectorStore.similaritySearch(
    'ESC/POS에서 돈통열기 명령어는 무엇인가요?',
  );

  console.log(results1[0]);
  console.log(results1.length);

  return results1;
});
