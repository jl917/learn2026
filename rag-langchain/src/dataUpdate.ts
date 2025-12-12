import { data } from "./rag/loader/pdf";
import { split } from "./rag/split/documents";
import { embeddings } from "./rag/embedding/ollama/HF_BGEM3ko";
import { store } from "./rag/store/milvus";
import { randomUUIDv5 } from "bun";

const vectorStore = store(embeddings);

const run = async () => {
  const allSplits = await split(data);
  let index = 1;
  for (const s of allSplits) {
    if (index % 1 === 0) console.log(`${index} / ${allSplits.length}`);
    index++;
    const document: any = {
      pageContent: s.pageContent,
      // Milvus wrapper expects metadata as an object mapping field names to values.
      // Our collection has a `metadata` field, so provide it as { metadata: <string> }.
      metadata: s.metadata,
    };
    console.log(document);
    await vectorStore.addDocuments([document]);
  }
};

run();
