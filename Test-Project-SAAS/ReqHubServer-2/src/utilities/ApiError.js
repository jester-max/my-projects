
class ApiError  {

    constructor(statusCode, message,fields) {

        this.status = 'ERROR';
        this.statusCode = statusCode||501;
        this.error = message;
        this.fields = fields
        this.language ="en_US";
        this.data = null;

    }
}

module.exports =  { ApiError }