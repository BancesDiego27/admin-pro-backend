const { response } = require('express')

const Hospital = require('../models/hospital')



const getHospitales = async (req,res=response)=>{

   const hospitales = await Hospital.find()
                                    .populate('usuario','nombre img')


    res.json({
        ok:true,
        hospitales
    })
}

const crearHospital = async (req,res = response)=>{
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    try {
        const hospitalDB = await hospital.save()
        res.json({
            ok:false,
            hospital: hospitalDB
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "hable con el admin"
        })
    }

}

const actualizarHospital =async(req,res=response)=>{
    const id = req.params.id;
    const uid = req.uid
    try {
        const hospitalDB = await Hospital.findById(id);
        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg: "No existe el hospital por id",
                id
            })
        }
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true})
        res.json({
            ok:true,
            msg: "Actualizado con Exito",
            hospital : hospitalActualizado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "hable con el admin"
        })
    }
}
const eliminarHospital =async(req,res=response)=>{
    const id = req.params.id;
    try {
        const hospitalDB = await Hospital.findById(id);
        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg: "No existe el hospital por id",
                id
            })
        }

        await Hospital.findByIdAndDelete(id)
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital

}