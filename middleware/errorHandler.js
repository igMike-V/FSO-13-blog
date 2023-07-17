const errorHandler = (err, req, res, next) => {
  console.log(req.path)
  if (err.errors[0].validatorName === "isEmail") {  
    return res.status(err.status || 500).json({error: "username must be a valid email address"});
  }
} 

module.exports = errorHandler