/*
Ruta api/login
*/

const {Router} = require('express')

const router = Router();
const { login, loginGoogle } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.post("/",[
    check('password','El password es obligatorio').not().isEmpty(),
    check('email', 'El email debe ser valido').isEmail(),
    validarCampos
    ],login)

router.post("/google",[
    check('token','El token de google es obligatorio').not().isEmpty(),
    validarCampos
    ],loginGoogle)

module.exports= router;