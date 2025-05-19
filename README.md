# 🖼️ Huffman Image Compressor

A **lossless image compression and decompression tool** using the classic **Huffman algorithm**, designed specifically for `.bmp` and `.png` images. This project compresses images without any loss in quality, preserving the original data perfectly.

---

## 🚀 Features

- 🔒 **Lossless Compression:** Compress images without losing any data.
- 🖼️ **Supports BMP & PNG:** Fully compatible with `.bmp` and `.png` formats.
- 🔄 **Compression & Decompression:** Compress and restore images seamlessly.
- ⚛️ **Frontend:** Built with **Vite + React** for a fast, modern UI.
- 🎨 **Styling:** Uses **Tailwind CSS** for sleek design.
- 🐍 **Backend:** Powered by **Flask** and **Flask-CORS**.
- 📷 **Image Processing:** Uses **Pillow** for handling images.
- 🔢 **Bit Handling:** Uses **bitarray** for efficient bit manipulation.
- 🐍 **Virtual Environment:** Easy setup with isolated dependencies.

---

## 🛠️ How It Works

1. **Compression:**
   - Upload `.bmp` or `.png` image.
   - Huffman algorithm analyzes pixel data, builds prefix tree, compresses to bitstream.
2. **Decompression:**
   - Upload compressed file.
   - Backend reconstructs the original image losslessly.

---

## ⚠️ Limitations

- Supports **only `.bmp` and `.png`** (lossless/uncompressed formats).
- Compression ratios depend on image complexity.
- No support for JPEG, GIF, or other formats yet.

---

## 🌟 Future Scope

- ➕ Add more image formats like TIFF, GIF.
- 📦 Batch processing for multiple images.
- ⏳ Progress bars and improved UI feedback.
- 🧮 Enhanced compression using other entropy coding methods.
- 🖥️ CLI tool for offline usage.
- 🔐 Add encryption for secure compressed storage.

---

## 📝 Setup & Usage

### Backend Setup

```bash
# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run Flask server
pyhton app.py

### Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
