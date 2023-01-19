const crypto = require('crypto')
const { promisify } = require('util');
const User = require('./../models/userModels');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};


const createSendToken = (user, statusCode,req, res) => {
  const token = signToken(user._id);
  
  const cookieOptions = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      // httpOnly: true,
  };
  
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true; // cookies are sent only via https 
  
  res.cookie('jwt', token, cookieOptions);
 
  // remove password field from output
  user.password = undefined;
  
  
  res.status(statusCode).json({
      token,
      status: 'success',
      data: {
          user
      }
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  if (!newUser) {
    res.status(404).json({
      status: 'fail',
      error: error,
    });
  }
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //1)Check if email and password exists
  if (!email || !password) {
    return next(new AppError('Please Provide correct email and password', 401));
  }

  //2)Check if user exists && password is correct
  const user = await User.findOne({ email });
  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //3)If everything is ok
  createSendToken(user,200,req,res);
};

exports.protect = catchAsync(async (req, res, next) => {
  //1)Getting the token and check it's there
  let token;
  
  token=req.cookies.jwt;

  console.log({token});  
  if (!token) {
    next(new AppError('You are not logged in Please log into get access', 401));
  }


  //2)Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //console.log(decoded);
  
  //3)Check if user still exixts
  const freshUser = await User.findById(decoded.id);
  
  if (!freshUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    );

    next();
  }

  //4)Check if user changed passowrd after the token issued
  if (freshUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'User recently changed password! Please log in again...',
        401
      )
    );
  }

  //Grant access to protected route
  req.user=freshUser;
  next()
});


exports.restrictTo = (...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
      return next(
        new AppError(
          `You don't have permission to perform this action`,
          403
        )
      );
    }
    next();
  }
}

exports.fogotPassword = catchAsync(async (req,res,next)=>{
  //1)get user based on posted email
  const user = await User.findOne({email:req.body.email})
  //console.log(user);
  if(!user){
    return next(
      new AppError(
        `Threre is no user with email address`,
        404
      )
    );
  }
  //2)Generate random reset token
  const resetToken =user.createPasswordResetToken()
  await user.save({validateBeforeSave:false});

  //3)Send it user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
  console.log(resetURL);
  const message = `Fogot your passwor? Submit a PATCH request with your new password and passowrdConfirm to : ${resetURL}.\nIf you didn't  foget your password, please ignore this email.`;

  try{
    await sendEmail({
      email:user.email,
      subject:'Your password reset token (valid for 10 minutes',
      message
    });
    res.status(200).json({
      status:'success',
      message:'Token sent to email'
    });
  }catch(err){
    console.log(err);
    user.passwordResetToken=undefined;
    user.passwordResetExpires=undefined
    await user.save({validateBeforeSave:false})

    return next(new AppError('There was an error sending the email.Try again later'),500);
  }
  
})

exports.resetPassword=catchAsync( async(req,res,next)=>{
  //1)Get user based on the token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user  = await USer.findOne({passwordResetToken:hashedToken,passwordResetExpires:{$gt:Date.now()}})
  //2)If token has not expired, and there is usert, set the new password
  if(!user){
    return next(new AppError('Token is invalid or has expired'),400);
  }
  console.log(user);
  user.password=req.body.password;
  user.passwordConfirm=req.body.passwordConfirm;
  user.passwordResetToken=undefined;
  user.passwordResetExpires=undefined;
  await user.save();


  //3) Update changedPasswordAt property for the user

  //4)Log the user in,send JWT
  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token
  });
});

exports.updatePassword =catchAsync( async(req,res,next)=>{
  //1) Get user from collection
  const user  = await User.findById(req.user.id).select('+password');

  //2) Check if POSTed current password is corret
  if(!(await user.correctPassword(req.body.passwordCurrent,user.password))){
    return next(new AppError('Your current password is wrong'),401);
  }
  //3)If so, update password
  user.password=req.body.password;
  user.passwordConfirm=req.body.passwordConfirm;
  await user.save();
   
  //4) Log user in, send JWT
  const token = signToken(user._id);

  res.status(200).json({
    token,
    status: 'success',
    data: {
        user
    }
});
});
