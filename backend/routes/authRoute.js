const { signupCtrl, loginCtrl, checkExistCtrl, sendEmailCtrl, updatePwCtrl } = require("../controllers/authCtrl");
const { userVerification } = require("../middlewares/authMiddleware");
const router = require('express').Router();

router.post("/signup", signupCtrl);
router.post('/login', loginCtrl)
router.post('/', userVerification);
router.post('/checkExist', checkExistCtrl);
router.post('/sendEmail', sendEmailCtrl)
router.post('/updatePw', updatePwCtrl)

module.exports = router;