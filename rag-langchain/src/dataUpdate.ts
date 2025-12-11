import { data } from "./rag/loader/pdf";
import { split } from "./rag/split/documents";
import { embeddings } from "./rag/embedding/ollama/HF_BGEM3ko";
import { store, createCollection, dropCollection, createMilvusIndex, dropIndex } from "./rag/store/milvus";

// createCollection()
// dropCollection('my_documents')
// createMilvusIndex()
// dropIndex()
const vectorStore = store(embeddings);

const run = async () => {
  const allSplits = await split(data);
  let index = 1;
  for (const s of allSplits) {
    if (index % 1 === 0) console.log(`${index} / ${allSplits.length}`);
    index++;
    // console.log(JSON.stringify(s));
    const document = { pageContent: s.pageContent, metadata: s.metadata };
    await vectorStore.addDocuments([document]);
  }
};

run();
