class ValidationError extends Error {
    constructor(message, errors) {
      super(message);
      this.name = 'Validation Error';
      this.status = 400;
      this.errors = errors;
    }
  }

  module.exports = {ValidationError}  