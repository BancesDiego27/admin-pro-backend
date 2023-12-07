require("dotenv").config();
const express = require('express');
const cors = require('cors');
const {dbconnection} = require('./database/config.js')

const app = express()
app.use(cors())

dbconnection();

app.get("/",(req,res)=>{
    res.json({
        ok: true,
        msg : "holi"
    })
});



app.listen(process.env.PORT, ()=>{
    console.log("Corriendo en el puerto "  + process.env.PORT)
})