/* 
Ruta /api/upload/
*/

const {Router} = require('express')

const router = Router();
const expressfileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornarImagen } = require('../controllers/uploads');

router.use(expressfileUpload())


router.put("/:tipo/:id",[
    validarJWT
    ],fileUpload)

router.get("/:tipo/:foto",[
    ],retornarImagen)
module.exports= router;