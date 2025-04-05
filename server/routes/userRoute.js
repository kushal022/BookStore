const express = require('express');
const router = express.Router();
const {authenticateToken} = require('./userAuth')
// import Controllers:
const {signUpCtrl, loginCtrl, getUserCtrl, updateUserAddressCtrl} = require('../controllers/userCtrl');

//todo: ----------------------- SignUp Route -----------------------

router.post('/signup', signUpCtrl )

//todo: ----------------------- SignIn/LongIn Route -----------------------

router.post('/signin', loginCtrl )

//todo: ----------------------- getUser info Route -----------------------

router.get('/getUser',authenticateToken, getUserCtrl )

//todo: ----------------------- Update User Route -----------------------

router.put('/updateUserAddress', authenticateToken, updateUserAddressCtrl)


// export router
module.exports = router;