import app from './src/app/app.js'

import connectToDb from './src/config/db.js'




await connectToDb()

app.listen(2000,()=>{
    console.log("server is porcessing.....")
})