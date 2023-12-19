const {response } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async(req,res= response)=>{
    const {email,password} = req.body
    try {
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no existe'
            })
        }
        const validPassword = bcrypt.compareSync(password,usuarioDB.password)
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña no existe'
            })
        }
        //Generar Token
        const token = await generarJWT(usuarioDB.id)

        res.json({
            ok:true,
            token 
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg : 'Hable con el administrador'
        })
    }
}
const loginGoogle = async(req,res= response)=>{
    try {
        const {email,picture,name} = await googleVerify(req.body.token)
        const usuarioDB = await Usuario.findOne({email});

        let usuario;

        if(!usuarioDB){
            usuario = new Usuario({
                nombre : name,
                email,
                imagen: picture,
                password: '@@@',
                google: true
            })
        }else{

            usuario = usuarioDB
            usuario.google= true;
            //usuario.password = '@@'
        }
        await usuario.save()
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            name,
            email,
            picture,
            token
        })

        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg : "Token de google invalido"
        })
    }
}

const renovarToken = async (req,res=response)=>{
    const uid = req.uid
    const token = await generarJWT(uid);
    const usuarioDB = await Usuario.findById(uid);
    if(!usuarioDB)  {
        return res.status(404).json({
            ok : false,
            msg : "No existe un usuario con ese ID"
        })
    }
    
    res.json({
        ok:true,
        token,
        Usuario:usuarioDB
    })
}

module.exports = {
    login,
    loginGoogle,
    renovarToken
}