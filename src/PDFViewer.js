import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";

export default function PDFViewer() {
  const { site, url } = useParams();
  const [data, setData] = useState("nodata");

  useEffect(() => {
    const encodedString = url.replace(/-/g, "+").replace(/_/g, "/");
    const decrypted = CryptoJS.AES.decrypt(encodedString, "cdac@123").toString(
      CryptoJS.enc.Utf8
    );

    axios
      .get("https://" + site + decrypted, {
        responseType: "arraybuffer"
      })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setData(pdfUrl);
      })
      .catch((err) => {
        setData("error");
      });

    // eslint-disable-next-line
  }, []);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
      {data !== "nodata" && data !== "error" && <Viewer fileUrl={data} />}
      {data === "error" && (
        <div style={{ textAlign: "center" }}>
          Application OK. Error Fetching PDF.
        </div>
      )}
    </Worker>
  );
}
