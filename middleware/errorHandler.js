const errorHandler = (err, req, res, next) => {
  console.log(err)
  if(!err.errors){
    return res.status(err.status||500).json({
      err
    })
  }
  if (err.errors[0].validatorName === "isEmail") {  
    return res.status(err.status || 500).json({error: "username must be a valid email address"});
  }
  next()
} 

module.exports = errorHandler