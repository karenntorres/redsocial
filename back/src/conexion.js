import mongoose from "mongoose";
mongoose

.connect(process.env.MONGODB)
.then((dato)=>{
    console.log('"Connected to database"');
}).catch((error)=>{
    console.log('ERROR, "Not connected to database"');
})