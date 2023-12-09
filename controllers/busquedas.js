const {response } = require('express')
const Usuario = require('../models/usuario')
const Medico = require('../models/medicos')
const Hospital = require('../models/hospital')

const busquedaTotal = async(req,res= response)=>{
    const busqueda = req.params.busqueda
    const regexBusqueda = new RegExp( busqueda , 'i')

    const [usuarios,medicos,hospitales] = await Promise.all([
        Usuario.find({nombre:regexBusqueda}),
        Medico.find({nombre:regexBusqueda}),
        Hospital.find({nombre:regexBusqueda})
    ])

    res.json({
        ok:true,
        usuarios,
        medicos,
        hospitales
    })
}
const busquedaColeccion = async(req,res= response)=>{
    const coleccion = req.params.coleccion
    const busqueda = req.params.busqueda
    const regexBusqueda = new RegExp( busqueda , 'i')
    let data;
    switch (coleccion) {
        case 'medicos':
            data = await Medico.find({nombre:regexBusqueda})
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img');
        break;
        case 'hospitales':
            data = await  Hospital.find({nombre:regexBusqueda})
                                .populate('usuario','nombre img')
        break;
        case 'usuarios':
            data = await Usuario.find({nombre:regexBusqueda})
    
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg : "La coleccion no existe solo sirve con medicos/hospitales/usuarios"
            })

    }
    res.json({
        ok:true,
        resultado : data
    })




}

module.exports = {
    busquedaTotal,
    busquedaColeccion
}