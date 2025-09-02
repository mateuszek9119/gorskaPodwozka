const mongoose = require('mongoose')

const DB = process.env.DATA_BASE

mongoose.connect(DB, { UseNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{console.log('Connect Successfully !')})
.catch((err)=>{console.log('Connect Error :' + err.message + '!')})