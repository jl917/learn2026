import { PDFReader } from "@llamaindex/readers/pdf";

const reader = new PDFReader();
const documents = await reader.loadData("./documents/Commande ESCPOS.pdf");

console.log(documents);
