require("dotenv").config();
const express = require('express');
const cors = require('cors');
const {dbconnection} = require('./database/config.js')

const app = express()
app.use(cors())
app.use(express.json())

dbconnection();

app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))


app.listen(process.env.PORT, ()=>{
    console.log("Corriendo en el puerto "  + process.env.PORT)
})