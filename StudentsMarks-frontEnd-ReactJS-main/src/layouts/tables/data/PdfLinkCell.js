import React from "react";
import axios from "axios";
import { saveAs } from "file-saver";

const PdfLinkCell = ({ value }) => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/download-pdf/${value}`, {
        responseType: "blob", // Set the response type to 'blob'
      });

      // Get the filename from the response headers or use the UUID as the filename
      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1]
        : `${value}.pdf`;

      // Save the PDF using file-saver library
      saveAs(response.data, filename);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default PdfLinkCell;
