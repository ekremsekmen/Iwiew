// src/middlewares/multerMiddleware.ts
import multer from 'multer';
import path from 'path';

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dosyaların geçici olarak yükleneceği dizin
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Dosya adı
  }
});

const upload = multer({ storage: storage });

export default upload;
