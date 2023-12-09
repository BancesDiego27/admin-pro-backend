/* 
Ruta /api/todo/:busqueda
*/

const {Router} = require('express')

const router = Router();
const {busquedaTotal, busquedaColeccion} = require('../controllers/busquedas')

const { validarJWT } = require('../middlewares/validar-jwt');

router.get("/:busqueda",[
    validarJWT
    ],busquedaTotal)

router.get("/coleccion/:coleccion/:busqueda",[
    validarJWT
    ],busquedaColeccion)

module.exports= router;