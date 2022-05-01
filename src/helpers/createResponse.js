const httpStatus = require("./httpStatusCode");

class NewError {
  constructor(
    httpStatusCode = httpStatus.OK,
    operation,
    isSuccess = true,
    total_count,
    success_count,
    data = []
  ) {
    (this.status = httpStatusCode),
      (this.operation = operation),
      (this.isSuccess = isSuccess),
      (this.total_count = total_count),
      (this.success_count = success_count),
      (this.data = data);
  }
}

module.exports = NewError;
