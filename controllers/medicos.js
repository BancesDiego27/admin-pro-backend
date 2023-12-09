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
    const id = req.params.id;
    const uid = req.uid
    try {
        const medicoDB = await Medico.findById(id);
        if(!medicoDB){
            return res.status(404).json({
                ok:false,
                msg: "No existe el medico por id",
                id
            })
        }
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id,cambiosMedico,{new:true})
        res.json({
            ok:true,
            msg: "Actualizado con Exito",
            medico : medicoActualizado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "hable con el admin"
        })
    }
}
const eliminarMedico =async(req,res=response)=>{
    const id = req.params.id;
    try {
        const medicoDB = await Medico.findById(id);
        if(!medicoDB){
            return res.status(404).json({
                ok:false,
                msg: "No existe el medico por id",
                id
            })
        }

        await Medico.findByIdAndDelete(id)
        res.json({
            ok:true,
            msg: "Eliminado con Exito",
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "hable con el admin"
        })
    }
}


module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico

}