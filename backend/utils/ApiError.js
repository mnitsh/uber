class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);

        this.statusCode = statusCode;
        this.errors = Array.isArray(errors) ? errors : [errors];
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
        this.success = false;
        this.isOperational = true;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
