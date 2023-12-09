const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path = require('path')
const fs = require('fs')

const fileUpload= (req,res= response) =>{
    const tipo = req.params.tipo
    const id = req.params.id
    const tipovalidos = ['hospitales','medicos','usuarios'];

    //validar tipo
    if(!tipovalidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:"El tipo seleccionado no es valido solo se admiten hospitales,medicos,usuarios" 
        })
    }
    //Validar que venga un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:"No se subio ningun archivo" 
        })
    }
    
    //procesar imagen
    const file = req.files.imagen
    const nombrecortado = file.name.split('.');
    const extensionArcvhivo = nombrecortado[nombrecortado.length-1];

    //Validar extension
    const extensionValidas = ['png','jpg','jpeg','gif']
    if(!extensionValidas.includes(extensionArcvhivo)){
        return res.status(400).json({
            ok:false,
            msg:"El archivo no tiene una extension valida/permitida" 
        })
    }
    
    //Colocar el nombre
    const nombreArchivo= `${uuidv4()}.${extensionArcvhivo}`;

    //Crear el path
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover la imagen
    file.mv(path, (err)=> {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok:false,
                msg : "Error al mover la imagen"
            });
        }
    //Actualizacion en DB
    actualizarImagen(tipo,id,nombreArchivo);

        res.json({
            ok:true,
            msg: "Archivo Subido",
            nombreArchivo

        })

      });

}

const retornarImagen = (req,res=response)=>{
    const tipo = req.params.tipo
    const foto = req.params.foto

    const pathImagen = path.join(__dirname,`../uploads/${tipo}/${foto}`)
    //Imagen por defetcto

    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen)
    }else{
      
        const pathImagen = path.join(__dirname,`../uploads/no-img.jpg`)
        res.sendFile(pathImagen)
    }

}

module.exports={
    fileUpload,
    retornarImagen
}