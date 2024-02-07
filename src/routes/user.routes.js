const Router = require('express').Router
const registerUser = require('../controllers/user.controller')
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

module.exports = router