from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from PIL import Image
import pickle
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
STATIC_FOLDER = 'static'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(STATIC_FOLDER, exist_ok=True)


from huffman import huffman_encoding, decoding

@app.route('/compress', methods=['POST'])
def compress_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    img = Image.open(file_path).convert('L')
    encoding_table, encoded_data, width, height = huffman_encoding(img)

    # Save compressed data
    compressed_path = os.path.join(STATIC_FOLDER, 'compressed.huff')
    with open(compressed_path, 'wb') as f:
        pickle.dump({
            'filename':file.filename,
            'encoding_table': encoding_table,
            'encoded_data': encoded_data,
            'width': width,
            'height': height
        }, f)

    original_size = os.path.getsize(file_path)
    compressed_size = os.path.getsize(compressed_path)
    compression_ratio = original_size / compressed_size
    compression_percentage = (1 - compressed_size / original_size) * 100


    return jsonify({
        'message': 'Compression successful',
        'original_size': original_size,
        'compressed_size': compressed_size,
        'compression_ratio': compression_ratio,
        'compression_percentage': compression_percentage,
        'compressed_file': 'compressed.huff'
    })

@app.route('/decompress', methods=['POST'])
def decompress_image():
    # Check if file is present
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']

    # Validate file extension
    if not file.filename.endswith('.huff'):
        return jsonify({'error': 'Only .huff files are allowed'}), 400

    # Save uploaded .huff file
    compressed_path = os.path.join(STATIC_FOLDER, 'uploaded_compressed.huff')
    file.save(compressed_path)

    # Decode image
    try:
        decode_image, new_pixel,original_filename = decoding(compressed_path)
    except Exception as e:
        return jsonify({'error': f'Failed to decode: {str(e)}'}), 500

    # Save decoded image
    decode_image_path = os.path.join(STATIC_FOLDER, 'decode.bmp')
    decode_image.save(decode_image_path)

    # Load the original image to compare for similarity (from upload folder)
    try:
        original_image_path = os.path.join(UPLOAD_FOLDER,original_filename)
        original_image = Image.open(original_image_path).convert('L')
        original_pixels = list(original_image.getdata())

        # Calculate similarity
        matching_pixels = sum(1 for o, d in zip(original_pixels, new_pixel) if o == d)
        similarity = round((matching_pixels / len(original_pixels)) * 100, 2)
    except Exception as e:
        similarity = None  # Skip similarity if error

    return jsonify({
        'message': 'Decompression successful',
        'similarity': similarity,
        'decompressed_file': 'decode.bmp'
    })


@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    file_path = os.path.join(STATIC_FOLDER, filename)
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404
    return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)