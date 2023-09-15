#Steps involved in Encoding

1) Encode the URL using CryptoJS libraries AES Algo with Secret Key
2) Convert the encoded string to URL Safe String
3) Here we are encoding just the path of the file of the server
4) The final url will be like this
    /pdfViewer/samnayakawadi.hyderabad.cdac.in:8080/fhsdfheru7ythgdrf

    The last letters are hashed file path

    This means
    files/download/644a6cab7eda79149a2bdb30 

5) Opening this URL means opening the decode page

#Steps involved in Decoding

1) The URL Safe String is converted into normal string
2) Then decode by AES algo
3) And displayed by the PDF Viewer


#Why to hash?
- Its not necessory. We can directly convert the URL to Safe URL & Pass to PDF Viewer URL
- But it helps in removing the direct showing the actual url.
- But the advanced users will get the actual url from the network tab