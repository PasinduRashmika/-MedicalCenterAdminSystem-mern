const  User  = require("../models/userModels");
const catchAsync = require("../utils/catchAsync")
const AppError = require('./../utils/appError');

const filterObj  = (obj,...allowFields)=>{
    const newObj ={};
    Object.keys(obj).forEach(el=>{
        if(allowFields.includes(el)) newObj[el]= obj[el]
    });
    return newObj;
}

exports.getAllUsers =catchAsync( async(req,res)=>{
    const users = await User.find();
    res.status(200).json({
        status:'success',
        results:user.lenth,
        data:{
            users
        }
    })
    res.status(500).json({
        status:'err',
        message:'This route is not yet define' 
    })
});

exports.updateMe = catchAsync(async(req,res,next)=>{
    //1)create error if user POSTs password data
    if(req.body.password || req.body.passwordConfirm){
        return next(new AppError('This is not for password updates.Please use /updatePassword.'),400);
    }

    //2)FilterOut unwamted fields names that are allowed to be updated
    //only update named fields
    const filteredBody = filterObj(req.body,'name','email')   

    //3)update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id,filteredBody,{new:true,runValidators:true});

    res.status(200).json({
        status:'success',
        data:{
            user:updatedUser
        }
    })
})

exports.deleteMe = catchAsync(async(req,res)=>{

        await User.findByIdAndUpdate(req.user.id,{active:false});
        res.status(204).json({
            status:'success',
           data:null
        })
    

    res.status(500).json({
        status:'err',
        message:'This route is not yet define' 
    })
})

exports.getUser = (req,res)=>{

    res.status(500).json({
        status:'err',
        message:'This route is not yet define' 
    })
}

exports.createUser = (req,res)=>{

    res.status(500).json({
        status:'err',
        message:'This route is not yet define' 
    })
}

exports.updateUser = (req,res)=>{

    res.status(500).json({
        status:'err',
        message:'This route is not yet define' 
    })
}

exports.deleteUser = (req,res)=>{

    res.status(500).json({
        status:'err',
        message:'This route is not yet define' 
    })
}