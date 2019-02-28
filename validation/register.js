const 
  Validator = require("validator"),
  isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be upto 2 or 30 characters long";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
