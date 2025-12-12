import { loadData } from "./rag/loader";
import { recursiveCharacterTextSpliter as split } from "./rag/split";

const run = async () => {
  const data = await loadData("../../static/json/post.json");
  const allSplits = await split(data);
  console.log(allSplits);
};

run();
