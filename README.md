# 🖼️ Huffman Image Compressor

A web app that **compresses and decompresses images** using the classic **Huffman algorithm**.  
Supports `.bmp` and `.png` images for lossless compression and decompression.

---

## ✨ Features

- 🗜️ Compress and decompress `.bmp` and `.png` images using Huffman coding  
- ⚛️ Built with a modern tech stack:
  - Frontend: **Vite + React + Tailwind CSS**  
  - Backend: **Flask + Flask-CORS**  
- 🖼️ Image processing with **Pillow** and bit manipulation with **Bitarray**  
- 🐍 Uses a Python **virtual environment** for clean dependency management

---

## ⚠️ Important Note on Compression Type

This project uses a custom logic where:

- The **original input image is colored (RGB)**  
- After compression and decompression, the output is a **grayscale version** of the original  
- This means **color information is lost** during the process  
- Because of this loss, the compression-decompression is **lossy**

| Original Image  | Decompressed Image | Compression Type |
|-----------------|--------------------|------------------|
| Colored (RGB)   | Grayscale          | 🔴 Lossy         |

> **Note:** While Huffman coding is generally lossless, this implementation results in grayscale images when decompressing colored inputs, making it a lossy process overall.

---
## 🎯 Usage

1. **Open the app** in your browser by navigating to:http://localhost:5173

2. **Upload an image**  
- Supported formats: `.bmp`, `.png`

3. **Compress**  
- Click the **Compress** button  
- Download the generated `.huff` (or similar) compressed file

4. **Decompress**  
- Upload the compressed file  
- Click the **Decompress** button  
- The output image will be restored (in grayscale if the original was colored)

5. **View or Save**  
- Right‑click the decompressed image to save locally, or view it directly in the browser

---

> **Note:** Decompressed images from colored inputs will be in grayscale due to the current implementation’s lossy color handling.

## 🛠️ Technologies Used

### Frontend
- Vite ⚡  
- React ⚛️  
- Tailwind CSS 🎨  

### Backend
- Flask 🐍  
- Flask-CORS 🌐  
- Pillow (PIL) 🖼️  
- Bitarray 🔢  

### Environment
- Python virtual environment 🐍

## ⚠️ Limitations

- The decompressed image loses color information and is restored as grayscale if the original was colored.  
- Only `.bmp` and `.png` image formats are supported.  
- Performance may degrade with very large images due to memory and processing constraints.  
- Compression ratio depends heavily on image content and may not always be significant.  

---

## 🚀 Future Scope

- Implement full lossless color compression to preserve RGB channels after decompression.  
- Add support for more image formats like `.jpeg`, `.tiff`, etc.  
- Improve UI/UX with preview functionality before and after compression.  
- Enable batch processing for multiple images simultaneously.  
- Optimize backend for faster compression and decompression speeds.  
- Add detailed compression statistics and visual graphs for user insights.  


## 🚀 Installation & Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/diksha-1234/huffman-image-compressor.git
   cd image-compressor
2. **Create &activate virtual environment**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate       # On Windows: venv\Scripts\activate
3. **Install backend dependencies**
   ```bash
   pip install -r requirements.txt
4. **Setup frontend**
    ```bash
   cd frontend
   npm install
   npm run dev
5. **Run Flask Backend**
    ```bash
    python app.py
---

🙏 **Thank you for checking out the Huffman Image Compressor!**  
If you find this project helpful, feel free to ⭐ the repo and contribute. Happy compressing! 🚀
