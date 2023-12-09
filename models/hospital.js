const {Schema,model} = require('mongoose')

const HospitalSchema = Schema({
    nombre :{
        type: String,
        requiered: true,
    },
    imagen :{
        type : String
    },
    usuario:{
        requiered: true,
        type : Schema.Types.ObjectId,
        ref: 'Usuario' //Es como una llave foranea
    }
},{ collection: 'hospitales'})

HospitalSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();
    return object 
})

module.exports= model('Hospital',HospitalSchema);