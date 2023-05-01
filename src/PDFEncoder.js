import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

export default function PDFEncoder() {
    const [domain, setDomain] = useState(null)
    const [encodedUrl, setEncodedUrl] = useState(null);
    const [encodedUrlWithoutBase64, setEncodedUrlWithoutBase64] = useState(null)
    const [codeToEncode, setCodeToEncode] = useState("");
    const [secretKey, setSecretKey] = useState("");

    useEffect(() => {
        const encrypted = CryptoJS.AES.encrypt(codeToEncode, secretKey).toString();
        setEncodedUrlWithoutBase64(encrypted)
        // const encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted)); // Converts to base64 but Gives the bigger string that is not possible to process by the apache2
        const safeEncodedString = encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // Hence removed the base64 conversion & used the same AES string but converted it into the URL safe string
        setEncodedUrl(safeEncodedString);

        // eslint-disable-next-line
    }, [codeToEncode, secretKey]);

    const codeToEncodeHandler = (e) => {
        setCodeToEncode(e.target.value);
    };

    const secretKeyHandler = (e) => {
        setSecretKey(e.target.value);
    };

    const domainHandler = (e) => {
        setDomain(e.target.value)
    }

    return (
        <div>
            Welcome to Crypto-JS Encode
            <br />
            Domain Name {"(Without http://)"}
            <input type="text" onChange={domainHandler} value={domain} />
            <br />
            Code to Encode
            <input type="text" onChange={codeToEncodeHandler} value={codeToEncode} />
            <br />
            Secret Key
            <input type="text" onChange={secretKeyHandler} value={secretKey} />
            <br />
            Generated Hash
            <br />
            {(encodedUrlWithoutBase64 !== null) && encodedUrlWithoutBase64}
            <br />
            Generated Hash {"(Safe for URL)"}
            <br />
            {(encodedUrl !== null) && encodedUrl}
            <br />
            Final URL
            <br />
            {(domain !== null) && "/pdfViewer/" + domain + "/" + encodedUrl}
        </div>
    );
}
