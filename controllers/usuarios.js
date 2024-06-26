const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/jwt')



const getUsuarios = async (req,res)=>{
    const desde = Number(req.query.desde) || 0

    const [usuarios,total] = await Promise.all([
        Usuario.find({},'nombre email google role imagen')
                                    .skip(desde)
                                    .limit(5),
        Usuario.countDocuments()
    ])
    res.json({
        ok: true,
        usuarios,
        total
    })
}

const crearUsuario = async (req,res = response)=>{
    const { email,password} = req.body
    try {
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(404).json({
                ok : false,
                msg : "El correo ya esta registrado"
            })
        }
        const usuario = new Usuario(req.body);
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        await usuario.save();

        const token = await generarJWT( usuario.id)
        
        res.json({
            ok: true,
            usuario,
            token
        })   
    } catch (error) {
        console.log(error);
       res.status(505).json({
        ok: false,
        msg : "Error inesperado "
       })
        
    }
}

const actualizarUsuario =async(req,res=response)=>{
    //TODO: Validar token y comprobar si el usuario correcto 
    const uid = req.params.id

    try {
    const usuarioDB = await Usuario.findById(uid);
    if(!usuarioDB){
        return res.status(404).json({
            ok : false,
            msg : "No existe un usuario con ese ID"
        })
    }
    // actualizacion 
    const {password,google,email,...campos} = req.body;
    // Si es el mismo usuario C:
    if(usuarioDB.email != email){
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(404).json({
                ok : false,
                msg : "El correo ya esta registrado"
            })
        }
    }
    if(!usuarioDB.google){
        campos.email = email;
    }else if(usuarioDB.email !== email) {
       return res.status(400).json({
            ok: false,
            msg : "Usuario de google no puede cambiar correo"
           })
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new: true});
    res.json({
        ok: true,
        usuario : usuarioActualizado
    })

    } catch (error) {
        console.log(error)
        res.status(505).json({
            ok: false,
            msg : "Error inesperado "
           })
    }
}
const eliminarUsuario =async(req,res=response)=>{
    const uid =req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB)  {
            return res.status(404).json({
                ok : false,
                msg : "No existe un usuario con ese ID"
            })
        }
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: "Usuario Eliminado " +uid
        })
    } catch (error) {
        console.log(error)
        res.status(505).json({
            ok: false,
            msg : "Error inesperado "
           })
    }
}


module.exports={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario

}