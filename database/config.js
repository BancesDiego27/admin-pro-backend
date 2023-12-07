const mongoose = require('mongoose');

const dbconnection = async() =>{
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log("Db Onlinne wuuu")
    } catch (error) {
        console.log(error);
        throw new Error("Error a  iniciar la base de datos")
    }
}

module.exports={
    dbconnection:dbconnection
}