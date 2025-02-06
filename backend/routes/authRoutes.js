const { signup, login, logout } = require('../controller/authController');
const { signupValidation, loginValidation } = require('../middleware/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/logout', logout);
router.post('/signup', signupValidation, signup);
router.post('/check-auth', signupValidation, (req, res) => {
    res.status(200).json({ message: 'Authenticated' });
});

module.exports = router;