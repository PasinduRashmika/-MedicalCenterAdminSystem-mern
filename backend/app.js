const express =require('express')
const app=express();
const morgan=require('morgan')
const cookieParser=require('cookie-parser');


const AppError = require('./utils/appError');
const globaleErrorHandeler = require('./controllers/errorController')
const userRouter = require('./routes/userRoutes');


app.get('/',(req,res)=>{
    res.status(200).send("Hello From Server side 👋 😄");
})

        //Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use((req,res,next)=>{
        req.requestTime = new Date().toISOString();
        next();
})

        //Routes
app.use('/api/v1/users',userRouter);



app.all('*',(req,res,next)=>{
        next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});

app.use(globaleErrorHandeler);

module.exports = app;