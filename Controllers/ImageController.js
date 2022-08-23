import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  }
});
const upload = multer({ storage: storage });

export const uploadImage = upload.single("file", (req, res) => {
  try {
    return res.status(201).json(`Successfully uploaded file ${req}`);
  } catch (err) {
    console.error(err);
  }
});
