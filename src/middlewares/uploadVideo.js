const multer = require('multer')

const videoUpload = multer({
    storage: multer.diskStorage({}),
    limits: {
        fileSize: 20000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      // upload only mp4 and mkv format
      if (file.mimetype == 'video/mp4' || file.mimetype == 'video/mkv') { 
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Just allowed mp4 and mkv type'));
      }
   },
});

module.exports = videoUpload