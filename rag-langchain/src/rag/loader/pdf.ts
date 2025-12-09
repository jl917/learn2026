import { resolve } from "path";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const directory = resolve(import.meta.dir, "../../static/ESCPOS.pdf");
const loader = new PDFLoader(directory);

export const pdfDocuments = await loader.load();
