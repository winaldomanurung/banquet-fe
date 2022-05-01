const httpStatus = require("./httpStatusCode");

class NewError {
  constructor(
    httpStatusCode = httpStatus.Internal_Server_Error,
    message = "Internal service error."
  ) {
    this.status = httpStatusCode;
    this.message = message;
  }
}

module.exports = NewError;
