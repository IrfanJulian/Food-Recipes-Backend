const multer = require('multer')

const upload = multer({
    limits: { fileSize: 10 * Math.pow(1024, 2 /* MBs*/) },
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      // console.log('bentuk '+ req);
      if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'video/mp4' || file.mimtype == 'video/mkv' ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Just allowed png, jpg, mp4, mkv type'));
      }
    },
});

module.exports = upload