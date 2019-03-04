const Validator = require("validator"),
  isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "What is your job title";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "People will want to know the name of your company";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "When did you start working there?";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
