import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

export default function PDFViewer() {
  const [decodedUrl, setDecodedUrl] = useState(null);
  const { site, url } = useParams();

  useEffect(() => {
    // const decoded = CryptoJS.enc.Base64.parse(url).toString(CryptoJS.enc.Utf8);
    const encodedString = url.replace(/-/g, "+").replace(/_/g, "/");
    const decrypted = CryptoJS.AES.decrypt(encodedString, "cdac@123").toString(
      CryptoJS.enc.Utf8
    );
    // console.log("decrypted", decrypted)

    // Now again the problem might occure is This string may not be accepted by the apache if has big encoded pdfURLString. Hence, We are going to take the url & the url/path separately using useParams
    setDecodedUrl("http://" + site + decrypted);
    //http:// or https:// is very important. You cannot remove that

    // eslint-disable-next-line
  }, []);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
      {decodedUrl !== null && <Viewer fileUrl={decodedUrl} />}
    </Worker>
  );
}
