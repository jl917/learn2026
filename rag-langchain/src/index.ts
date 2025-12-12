import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOllama } from "@langchain/ollama";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { systemPrompt } from "./prompt";

import { loadData } from "./rag/loader";
import { split } from "./rag/split/documents";
import { embeddings } from "./rag/embedding/ollama/HF_BGEM3ko";
import { store } from "./rag/store/memory";

const question = "open drawer";

const vectorStore = store(embeddings);

const docs = async (question: string) => {
  const data = await loadData("../../static/pdf/ai-use-cases-to-launch-today_ko_KR.pdf");
  const allSplits = await split(data);

  for (const { pageContent } of allSplits) {
    console.log("---", allSplits.length);
    await embeddings.embedQuery(pageContent);
  }

  await vectorStore.addDocuments(allSplits);

  const results1 = await vectorStore.similaritySearch(question);

  console.log(results1);
  console.log(results1.length);

  return results1;
};

const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://localhost:11434";
const MODEL = process.env.OLLAMA_MODEL ?? "qwen3:8b";

const llm = new ChatOllama({
  baseUrl: OLLAMA_URL,
  model: MODEL,
  temperature: 0.7,
});

const system = new SystemMessage(systemPrompt);

const prompt = ChatPromptTemplate.fromMessages([system, new MessagesPlaceholder("messages")]);

const chain = RunnableSequence.from([prompt, llm]);

const run = async () => {
  const results = await docs(question);
  console.log(results[0]?.metadata.loc.lines);
  // console.log(results.map((doc) => doc.pageContent).join("\n\n"));
  // const aiMsg = await chain.invoke({
  //   context: results.map((doc) => doc.pageContent).join("\n\n"),
  //   messages: [new HumanMessage(question)],
  // });

  // if (typeof aiMsg.content === "string") return aiMsg.content;
  // aiMsg.content.map((c: any) => c?.text ?? "").join("");
  return;
};

run();
