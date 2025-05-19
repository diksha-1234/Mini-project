import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import ResultDisplay from './ResultDisplay';
import 'react-toastify/dist/ReactToastify.css';

const FileUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedHuff, setSelectedHuff] = useState(null);
  const [result, setResult] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDecompressing, setIsDecompressing] = useState(false);

  const handleImageChange = (e) => setSelectedImage(e.target.files[0]);
  const handleHuffChange = (e) => setSelectedHuff(e.target.files[0]);

  const handleCompress = async () => {
    if (!selectedImage) return toast.error("Please upload an image first.");
    setIsCompressing(true);
    toast.info("Compression started...");
    const formData = new FormData();
    formData.append('file', selectedImage);
    try {
      const res = await axios.post('http://localhost:5000/compress', formData);
      toast.success("Compression successful!");
      setResult(res.data);
    } catch (err) {
      toast.error("Compression failed.");
      console.error(err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDecompress = async () => {
  if (!selectedHuff || !selectedHuff.name.endsWith('.huff')) {
    return toast.error("Please upload a valid .huff file.");
  }
  setIsDecompressing(true);
  toast.info("Decompression started...");
  const formData = new FormData();
  formData.append('file', selectedHuff);
  try {
    const res = await axios.post('http://localhost:5000/decompress', formData);
    toast.success("Decompression successful!");
    setResult(res.data);
  } catch (err) {
    toast.error("Decompression failed.");
    console.error(err);
  } finally {
    setIsDecompressing(false);
  }
};


return (
  <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-purple-100 to-yellow-50 py-10 px-4 md:px-20 font-sans text-gray-800">
    <h1 className="text-4xl font-bold text-purple-700 text-center mb-10 tracking-wide drop-shadow-md">
       Huffman Image Compressor
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Compress Section */}
      <div className="bg-white shadow-xl rounded-2xl p-6 transition-all hover:shadow-2xl">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4 text-center">Upload Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isCompressing || isDecompressing}
          className="file-input file-input-bordered file-input-secondary w-full"
          style={{ border: 'none', boxShadow: 'none', outline: 'none', background: 'transparent' }}
        />
        <button
          onClick={handleCompress}
          disabled={isCompressing || isDecompressing}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg shadow transition duration-300"
        >
          {isCompressing ? (
            <span className="flex items-center justify-center">
              <span className="loader animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Compressing...
            </span>
          ) : 'Compress'}
        </button>
      </div>

      {/* Decompress Section */}
      <div className="bg-white shadow-xl rounded-2xl p-6 transition-all hover:shadow-2xl">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4 text-center">Upload .huff File</h2>
        <input
          type="file"
          accept=".huff"
          onChange={handleHuffChange}
          disabled={isCompressing || isDecompressing}
          className="file-input file-input-bordered file-input-accent w-full"
          style={{ border: 'none', boxShadow: 'none', outline: 'none', background: 'transparent' }}
        />
        <button
          onClick={handleDecompress}
          disabled={isCompressing || isDecompressing}
          className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg shadow transition duration-300"
        >
          {isDecompressing ? (
            <span className="flex items-center justify-center">
              <span className="loader animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Decompressing...
            </span>
          ) : 'Decompress'}
        </button>
      </div>
    </div>

    {/* Result Display */}
    {result && (
      <div className="mt-12 max-w-4xl mx-auto">
        <ResultDisplay data={result} />
      </div>
    )}

    <ToastContainer position="bottom-right" />
  </div>
);
};

export default FileUpload;