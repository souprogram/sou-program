export const errorMiddleware = (error, req, res, next) => {
    console.error(
        `[${req.method}] ${req.originalUrl} - ${error.name}: ${error.message}`
    );

    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction) {
        return res.status(500).send('Something went wrong.');
    }

    return res.status(error.status || 500).json({
        error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
        },
    });
};
