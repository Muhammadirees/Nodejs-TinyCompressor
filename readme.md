# TinyCompressor

TinyCompressor is a Node.js project developed to compress images and reducing their size while maintaining acceptable quality. It is built using Node.js, Express.js, and utilizes the multer and sharp libraries. This project is best used in conjunction with Postman for easy image compression testing and evaluation.

## Features

- Image Compression: The application utilizes the sharp library to compress images, reducing their file size without significant loss of quality.
- File Upload: The multer middleware is employed to handle file uploads, allowing users to submit images for compression.
- Express.js: The project is built on top of the Express.js framework, providing a robust and scalable web server.

## Installation

To run the Node.js Image Compression project locally, follow these steps:

- Clone the repository: git clone
- Navigate to the project directory:
- Install the dependencies: npm install
- Start the server: npm start
- Open your web browser and visit: http://localhost:3000

## Usage

Once the project is up and running, you can use the Postman to upload images for compression. Follow these steps:

- Open Postman and visit: http://localhost:3000
- Click on the "Upload Image" button.
- Select an image file from your local machine.
- Click the "Upload" button.
- The server will compress the image and provide you with a download link for the compressed version.

Feel free to experiment with different images and observe the reduction in file size achieved through compression.

<img
  src="/TinyCompressor/photo1.PNG"
  alt="Alt text"
  title="Optional title"
  style="display: inline-block; margin: 0 auto; max-width: 300px">

## Customization

The Node.js Image Compression project can be customized to fit your specific requirements. Consider the following customization options:

- Compression Quality: Adjust the compression quality settings in the sharp library to achieve a balance between file size reduction and image quality.
- File Size Limit: Modify the multer configuration to set a maximum file size limit for uploads.
- Output Format: Change the output format of the compressed images (e.g., JPEG, PNG) by modifying the sharp options.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request on the project's GitHub repository.
