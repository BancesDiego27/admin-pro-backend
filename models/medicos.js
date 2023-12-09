const {Schema,model} = require('mongoose')

const MedicoSchema = Schema({
    nombre :{
        type: String,
        requiered: true,
    },
    imagen :{
        type : String
    },
    usuario:{
        requiered:true,
        type : Schema.Types.ObjectId,
        ref: 'Usuario' //Es como una llave foranea
    },
    hospital:{
        requiered:true,
        type : Schema.Types.ObjectId,
        ref: 'Hospital' //Es como una llave foranea
    }
})

MedicoSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();
    return object 
})

module.exports= model('Medico',MedicoSchema);