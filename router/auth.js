const {
  signUp,
  login,
  updateUser,
  getAllusers,
  getOneUser,
  likeProduct,
  deleteUser
  } = require('../controllers/auth');

const express = require('express');
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/user-image'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = file.originalname.split('.').pop();
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    },
  });
  const upload = multer({ storage: storage });

router.post("/login",login);
router.post("/signup", upload.single('file'), signUp);

// ####### UPDATE USER
router.post("/update/:id",updateUser);

// ####### GET USER
router.get("/getAll",getAllusers);
router.get("/getOne/:id",getOneUser);

// ####### LIKED PRODUCT
router.post("/likedProduct/:id",likeProduct)

// ####### DELETE USER 
router.delete("/delete/:id",deleteUser);

module.exports=router;