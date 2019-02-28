const 
  Validator = require("validator"),
  isEmpty = require("./is-empty");
  module.exports = function validateRegisterInput(data) {
    let errors = {};
 
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  


  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be upto 2 or 30 characters long";
  }

  if(Validator.isEmpty(data.name)) {
    errors.name = 'We need your name';
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = 'We need your email';
  }

    
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Use a valid email';
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = 'You need a password';
  }

  if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
    errors.password = "Passwords must be upto 1 or 30 characters long";
  }

  if(Validator.isEmpty(data.password2)) {
    errors.password2 = 'Comfirm your password'
  }

  if(!Validator.equals(data.password,data.password2)) {
    errors.password2 = 'Your passwords don\'t match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
