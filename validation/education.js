const Validator = require("validator"),
  isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "What is the name of your school";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "People will want to know  your degree";
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "People will want to know  your fieldofstudy";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "When did you start your education there?";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
