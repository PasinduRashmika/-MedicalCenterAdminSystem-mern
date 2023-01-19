const mongoose = require('mongoose');
const { config } = require('dotenv');
// require('dotenv/config');
const dotenv=require('dotenv');

dotenv.config({path:'./config.env'});
const app =require('./app')

console.log(`=========== env : ${process.env.NODE_ENV}================`);

const port=3000;
app.listen(port,()=>{  
    console.log("App is running on port "+port+" 😁");
})


//ConnectMongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(()=>{
    console.log('Database Connection is ready 👍👍')
})
.catch((err)=>{
    console.log(err);
})

