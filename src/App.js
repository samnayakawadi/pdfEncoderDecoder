import "@react-pdf-viewer/core/lib/styles/index.css";
import { useRoutes } from "react-router-dom";
import PDFViewer from "./PDFViewer";
import PDFEncoder from "./PDFEncoder";

export default function App() {
  let element = useRoutes([
    { path: ":site/:url", element: <PDFViewer /> },
    { path: "encoder", element: <PDFEncoder /> },
  ]);

  return element;
}