
class ApiPending  {

    constructor(statusCode, message) {

        this.status = 'PENDING';
        this.statusCode = statusCode||300;
        this.message = message;
        this.language ="en_US";
        this.data = null;

    }
}

module.exports =  { ApiPending }