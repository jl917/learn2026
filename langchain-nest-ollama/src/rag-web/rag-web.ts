import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { OllamaEmbeddings } from '@langchain/ollama';
import { Chroma } from '@langchain/community/vectorstores/chroma';

const VECTORSTORE_PATH = 'http://localhost:8000';

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const embeddings = new OllamaEmbeddings({
  model: 'nomic-embed-text',
  baseUrl: 'http://localhost:11434',
});

const loader = new CheerioWebBaseLoader(
  'https://jl917.github.io/llms-full.txt',
);

export const docs = (question: string) =>
  loader.load().then(async (doc) => {
    // Ensure the vectorstore directory exists before load/save operations
    // let vectorStore: Chroma | undefined;
    console.log(doc);
    // 캐시 해둠
    const vectorStore = new Chroma(embeddings, {
      collectionName: 'my_documents',
      url: VECTORSTORE_PATH, // 로컬 경로
    });

    // 데이터 추가
    // const allSplits = await textSplitter.splitDocuments(doc);
    // vectorStore = await Chroma.fromDocuments([], embeddings, {
    //   collectionName: 'my_documents',
    //   url: VECTORSTORE_PATH,
    // });
    // // 모든 문서의 단락을 저장한다.
    // for (let i = 0; i < allSplits.length; i++) {
    //   console.log((((i + 1) / allSplits.length) * 100).toFixed(2) + '%');
    //   await vectorStore.addDocuments([allSplits[i]]);
    // }

    // console.log(doc)

    if (!vectorStore) {
      console.log('데이터 로드 에러');
      return [];
    }

    // 문서의 단락중 검색해서 사용한다.
    const results = await vectorStore.similaritySearch(question);
    console.log(results);
    return results;
  });
