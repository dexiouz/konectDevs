const 
  Validator = require("validator"),
  isEmpty = require("./is-empty");


  module.exports = function validateLoginInput(data) {
    let errors = {};
 
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
  
    if(!Validator.isEmail(data.email)) {
      errors.email = 'Use a valid email';
    }

  if(Validator.isEmpty(data.email)) {
    errors.email = 'We need your email';
  }

  
  if(Validator.isEmpty(data.password)) {
    errors.password = 'You need a password';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
