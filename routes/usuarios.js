/*
Ruta  /api/usuarios
*/
const {Router} = require('express')
const {getUsuarios,crearUsuario, actualizarUsuario, eliminarUsuario} = require('../controllers/usuarios');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get("/",validarJWT,getUsuarios);
router.post("/",[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email', 'El email debe ser valido').isEmail(),
    validarCampos,

    //Tambien funciona en lugar de check body
],crearUsuario);
router.put("/:id",[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email debe ser valido').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
],actualizarUsuario)

router.delete("/:id",[
    validarJWT
],eliminarUsuario)

module.exports = router;