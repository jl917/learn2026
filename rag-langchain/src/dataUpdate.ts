import { data } from "./rag/loader/pdf";
import { split } from "./rag/split/documents";
import { embeddings } from "./rag/embedding/ollama/HF_BGEM3ko";
import { store } from "./rag/store/chroma";

const vectorStore = store(embeddings);

const run = async () => {
  const allSplits = await split(data);
  let index = 1;
  for (const s of allSplits) {
    if (index % 1 === 0) console.log(`${index} / ${allSplits.length}`);
    index++;
    console.log(JSON.stringify(s));
    const document = { pageContent: s.pageContent, metadata: JSON.stringify(s.metadata) as any };
    await vectorStore.addDocuments([document]);
  }
};

run();
