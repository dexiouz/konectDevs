const Validator = require("validator"),
  isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Your post has to be between 10 and 300 chrcters.";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Your post cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
