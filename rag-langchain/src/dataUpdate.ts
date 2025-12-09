import { pdfDocuments as data } from "./rag/loader/pdf";
import { splitDocuments as split } from "./rag/split/documents";
import { nomicEmbedText as embeddings } from "./rag/embedding/ollama/nomicEmbedText";
import { chroma as store } from "./rag/store/chroma";

const vectorStore = store(embeddings);

const run = async () => {
  const allSplits = await split(data);
  let index = 1;
  for (const s of allSplits) {
    if (index % 1 === 0) console.log(`${index} / ${allSplits.length}`);
    index++;
    console.log(s);

    await vectorStore.addDocuments([s]);
  }
};

run();
