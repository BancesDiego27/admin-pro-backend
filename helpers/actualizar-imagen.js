const fs = require('fs')
const Usuario = require('../models/usuario')
const Hospital = require('../models/hospital')
const Medico = require('../models/medicos')
const path = require('path')
const { pathToFileURL } = require('url')

const borrarImagen = (path)=>{
    if(fs.existsSync(path)){
        //Borrar imagen vieja 
        fs.unlinkSync(path)
    }
}


const actualizarImagen = async (tipo,id,nombreArchivo)=>{
    let pathViejo;
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id)
            if(!medico){
                console.log("No existe el medico")
                return false
            }
            pathViejo = `./uploads/medicos/${medico.imagen }`;
            borrarImagen(pathViejo);
            medico.imagen = nombreArchivo;
            await medico.save()
            return true;

        case 'hospitales':
            const hospital = await Hospital.findById(id)
            if(!hospital){
                console.log("No existe el hospital")
                return false
            }
            pathViejo = `./uploads/hospitales/${hospital.imagen }`;
            borrarImagen(pathViejo);
            hospital.imagen = nombreArchivo;
            await hospital.save()
            return true;

        case 'usuarios':
            const usuario = await Usuario.findById(id)
            if(!usuario){
                console.log("No existe el usuario")
                return false
            }
            pathViejo= `./uploads/usuarios/${usuario.imagen }`;
            borrarImagen(pathViejo);
            usuario.imagen = nombreArchivo;
            await usuario.save()
            return true;

    }

}

module.exports = {
    actualizarImagen,

}