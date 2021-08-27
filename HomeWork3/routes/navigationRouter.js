const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('startPage');
});
router.get('/registration', (req, res) => {
    res.render('registration');
});
router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;
