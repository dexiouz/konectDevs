const Validator = require("validator"),
  isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = "Your handle needs to be between 2 and 30 characters long";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "You need to provide a handle for your profile";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "We want to know your status";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "you must have some skills right? list them...";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "That's not a valid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "That's not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "That's not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "That's not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "That's not a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "That's not a valid URL";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
