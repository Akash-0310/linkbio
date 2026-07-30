const express = require('express');
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/auth');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const MAX_BYTES = 5 * 1024 * 1024;

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: MAX_BYTES } });

// Multer reports a rejected type or an oversized file by handing an error to
// next(). There is no error middleware mounted, so those used to fall through to
// Express's default handler and come back as an HTML 500 — the client parses the
// response as JSON and could only show "something went wrong". Translate them
// into the JSON shape the rest of the API uses.
const handleUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (!err) return next();
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
          message: `Image is too large. Please use a file under ${MAX_BYTES / (1024 * 1024)}MB.`,
        });
      }
      return res.status(400).json({ message: err.message });
    }
    // fileFilter rejection, or a disk write failure.
    return res.status(400).json({ message: err.message || 'Upload failed' });
  });
};

router.post('/', protect, handleUpload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});

module.exports = router;
