import { recursiveCharacterTextSpliter as split } from "./rag/split";
import { embeddings } from "./rag/embedding/ollama/HF_BGEM3ko";
import { store } from "./rag/store/milvus";
import { loadData } from "./rag/loader";

const vectorStore = store(embeddings);

const run = async () => {
  const data = await loadData("../../static/pdf/ai-use-cases-to-launch-today_ko_KR.pdf");
  const allSplits = await split(data, "markdown", {});
  let index = 1;
  for (const s of allSplits) {
    if (index % 1 === 0) console.log(`${index} / ${allSplits.length}`);
    index++;
    const document: any = {
      pageContent: s.pageContent,
      metadata: s.metadata,
    };
    console.log(document);
    await vectorStore.addDocuments([document]);
  }
};

run();
