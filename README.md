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

How to Use This PDF Viewer Final Page?

	1) Use the iFrame
		a. E.g. http://meghs1.hyderabad.cdac.in/pdfViewer/VTJGc2RHVmtYMThlYlpGa21TSjFWSzF4RFRWcFNEWWlEUElJbVVOVTN5RXZ3dy9sNW51VitqTGpOQ242VTNSajdBd3dub3dsQjJxK2hPa3VTeXF1Z0w4TkpkWFJvdVJDMUdJa0VHaEtZZVVXeHlMUkNkWnZGVWJXNlZNQldJTEMvQUdMOUdwRXFOR2lMNVJScTk4NnBRPT0=
	2) Install the package in react app
		
		"crypto-js": "^4.1.1",
		
	3) Enode the PDF URL
		
		const encrypted = CryptoJS.AES.encrypt(PDFURL, secretKey).toString();
		    const encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted));
		    setEncodedUrl(encoded);
		
		- Here first the encoding is done by normal way.
		- Then that encoded text is converted into the base64 code that consists of only alpha-numeric characters

	4) Decode the PDF URL
		
		const decoded = CryptoJS.enc.Base64.parse(url).toString(CryptoJS.enc.Utf8);
		    const decrypted = CryptoJS.AES.decrypt(decoded, "cdac@123").toString(CryptoJS.enc.Utf8);
		    setDecodedUrl(decrypted)
		
		- Here I have given the fixed secret key. Obivously, This key is secret & must be added while encoding.
	
	5) Use the Following URL to Add the Encoded String
		a. meghs1.hyderabad.cdac.in/pdfViewer/{EncodedString}
		
	6) Use this URL to Encode Any URL for this package
https://csb-52epnl.netlify.app/