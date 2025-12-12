import { loadData } from "./rag/loader";
import { split } from "./rag/split/documents";

const run = async () => {
  const data = await loadData("../../static/md/llms.md");
  console.log(data);
  // const allSplits = await split(data);
  // console.log(allSplits[0]);
};

run();
