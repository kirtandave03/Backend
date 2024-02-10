const Router = require('express').Router
const { registerUser,loginUser,logoutUser,refreshAccessToken } = require('../controllers/user.controller')
const verifyJWT = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.middleware');

const router = Router();

router.route('/register').post(
    upload.fields([
        {
            name:'avatar',
            maxCount: 1
        },
        {
            name : 'coverImage',
            maxCount: 1
        }
    ])
    ,registerUser)

router.route('/login').post(loginUser)


// secure routes

router.route('/logout').post(verifyJWT, logoutUser)
router.route('/refresh-token').post(refreshAccessToken);

module.exports = router