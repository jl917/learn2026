import { resolve } from "path";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const directory = resolve(import.meta.dir, "../../static/ai-use-cases-to-launch-today_ko_KR.pdf");
const loader = new PDFLoader(directory);

export const data = await loader.load();
