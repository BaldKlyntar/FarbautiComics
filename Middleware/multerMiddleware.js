import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // set the directory where uploaded files will be stored
      cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage });
  
  export default upload;


  export const checkImageUpload = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Image is required 2' });
    }
    req.body.image = req.file.path;
    next();
};