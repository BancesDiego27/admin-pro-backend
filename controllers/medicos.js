const { response } = require('express')
const Medico = require('../models/medicos')

const { generarJWT } = require('../helpers/jwt')



const getMedicos = async (req,res=response)=>{
    const medicos = await Medico.find()
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img')


    res.json({
    ok:true,
    medicos
    })
}

const crearMedico = async (req,res = response)=>{
    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        const medicoDB = await medico.save()
        res.json({
            ok:false,
            medico: medicoDB
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "hable con el admin"
        })
    }
}

const actualizarMedico =async(req,res=response)=>{
    res.json({
        ok:false,
        msg: "actualizarMedico"
    })
}
const eliminarMedico =async(req,res=response)=>{
    res.json({
        ok:false,
        msg: "eliminarMedico"
    })
}


module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico

}