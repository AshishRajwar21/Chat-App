
const notFound = (req, res, next) => {
    const error = new Error(`Not Found : ${req.originalUrl} `);
    res.status(404);
    next(error);
}; 

const errorHandling = (err,req,res,next) => {
    const statusCode = (res.statusCode===200) ? 500 : res.statusCode;   
    //it mean if there is success in response but still there is error is internal server error
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV==="production" ? null : err.stack,
    });
};

module.exports = {notFound, errorHandling};