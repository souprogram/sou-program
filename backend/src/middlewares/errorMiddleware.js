export const errorMiddleware = (error, req, res, next) => {
    console.error(
        `[${req.method}] ${req.originalUrl} - ${error.name}: ${error.message}`
    );
    res.status(500).send('Something went wrong.');
};
