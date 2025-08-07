import React from "react";
import { FaUserMd, FaFilePdf } from "react-icons/fa";
import download from "downloadjs";
import { toast } from "react-toastify";

const PrescriptionCard = ({ prescription }) => {
  const { content, pdfUrl, doctor } = prescription || {};

  const handleDownload = () => {
    if (pdfUrl) {
      download(pdfUrl, "prescription.pdf", "application/pdf");
    } else {
      toast.error("PDF not available.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-xl font-bold text-gray-800 flex items-center">
          <FaUserMd className="mr-2 text-teal-600" /> Title
        </h2>

        <div className="space-y-4 grow">
          <div>
            <h3 className="font-semibold text-gray-700">Doctor:</h3>
            <p className="text-gray-600">{doctor?.name}</p>
            <p className="text-gray-500 text-sm">{doctor?.email}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Content:</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{content}</p>
          </div>
        </div>

        <div className="card-actions justify-end">
          <button
            onClick={handleDownload}
            className="btn bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition w-full"
          >
            <FaFilePdf /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionCard;