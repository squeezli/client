const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const auth = require('../middleware/auth')

// User

router.post('/user/create',
    [
        check('email', 'Введите корректный email').isEmail(),
        check('password', 'Введите пароль').isLength({ min: 6 })
    ],
    require('../controllers/userAuth').createUser)

router.post('/user/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    require('../controllers/userAuth').loginUser)

router.post('/user/create/groop',
    [
        check('login', 'Введите корректный login').isLength({min: 6}),
        check('nameGroop', 'Введите корректное имя').isLength({min: 2}),
        check('passwordGroop', 'Введите пароль').isLength({ min: 6 })
    ], auth,
    require('../controllers/userLogick').createGroop)

router.get('/user/groops',auth, require('../controllers/userLogick').listGroop)
router.get('/user/groop/:login',auth, require('../controllers/userLogick').cardGroop)
router.post('/user/:login/new',auth, require('../controllers/weekAdd').weekAdd)
router.put('/user/:login/update',auth, require('../controllers/weekUpdate').weekUpdate)
router.delete('/user/:login/week/delete',auth, require('../controllers/delete').weekDelete)
router.delete('/user/:login/delete',auth, require('../controllers/delete').groopDelete)

// Groop

router.post('/groop/login', require('../controllers/groopAuth').loginGroop)

// router.post('login', require('../controllers/user').loginUser)


module.exports = router