const ResultDisplay = ({ data }) => {
  const downloadFile = (filename) => {
    const link = document.createElement('a');
      link.href = `http://localhost:5000/download/${filename}`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg mx-auto mt-8 border border-purple-300 animate-fadeIn">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">📊 Results</h2>

      {data.original_size && (
        <div className="space-y-2 text-left text-gray-700">
          <p>📁 Original Size: <span className="font-semibold">{data.original_size}</span> bytes</p>
          <p>🗜️ Compressed Size: <span className="font-semibold">{data.compressed_size}</span> bytes</p>
          <p>📉 Compression Ratio: <span className="font-semibold">{data.compression_ratio}%</span></p>
          <button
            onClick={() => downloadFile(data.compressed_file)}
            className="mt-3 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition duration-300"
          >
            ⬇️ Download Compressed File
          </button>
        </div>
      )}

      {data.similarity && (
        <div className="mt-6 space-y-2 text-left text-gray-700">
          <p>🎯 Similarity with Original Image: <span className="font-semibold">{data.similarity}%</span></p>
          <button
            onClick={() => downloadFile(data.decompressed_file)}
            className="mt-3 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition duration-300"
          >
            ⬇️ Download Decompressed Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;