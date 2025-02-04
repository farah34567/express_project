const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; // Extract token correctly

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User not authorized"); // Authorization failed
            }
            req.user = decoded; // Attach user data to request
            next(); // Proceed to next middleware
        });

    } else {
        res.status(401);
        throw new Error("Authorization token missing");
    }
});

module.exports = validateToken;
