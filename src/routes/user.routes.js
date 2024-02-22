const Router = require("express").Router;
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getWatchHistory,
  forgotPassword,
  getCurrectUser,
  updateUserAvatar,
  updateUserCoverImage,
} = require("../controllers/user.controller");
const verifyJWT = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secure routes

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(verifyJWT, forgotPassword);
router.route("/get-currect-user").get(verifyJWT, getCurrectUser);
router.route("/update-account-details").patch(verifyJWT, updateAccountDetails);
router
  .route("/update-user-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/update-user-cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

router.route("/channel/:username").get(verifyJWT, getWatchHistory);
router.route("/watchhistory").get(verifyJWT, getWatchHistory);

module.exports = router;
