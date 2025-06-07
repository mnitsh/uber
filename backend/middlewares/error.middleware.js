const globalErrorHandler = (err, req, res, next) => {
    if (!err.isOperational) {
        console.error("Unexpected error: ", err);
    }

    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    return res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
    });
};

export { globalErrorHandler };
