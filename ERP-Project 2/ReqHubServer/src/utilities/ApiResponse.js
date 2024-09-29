class ApiResponse {
  constructor(statusCode, data, dataLength, message) {
    this.status = 'SUCCESS';
    this.statusCode = statusCode || 200;
    this.message = message || null;
    this.language = 'en_US';
    version: dataLength || null, (this.data = data);
  }
}

module.exports = { ApiResponse };
