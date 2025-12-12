import { resolve } from "path";
import { PDFReader } from "@llamaindex/readers/pdf";
import { llamaToLangchain } from ".";

const directory = resolve(import.meta.dir, "../../static/ai-use-cases-to-launch-today_ko_KR.pdf");
const reader = new PDFReader();
const documents = await reader.loadData(directory);

export const data = llamaToLangchain(documents);
