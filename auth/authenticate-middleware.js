const jwt = require("jsonwebtoken");
const db = require("../api/db");

/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
module.exports = (req, res, next) => {
    // Get data from request
    const { authorization } = req.headers;
    const secret = process.env.JWT_SECRET || "sUpeR sEcret cOde";

    // Verify user is logged-in
    if (authorization) {
        jwt.verify(authorization, secret, (error, token) => {
            if (!error) {
                req.token = token;
                next();
            } else {
                // Nope :(
                res.status(401).json({ you: "shall not pass!" });
            }
        });
    } else {
        // Nope :(
        res.status(401).json({ you: "shall not pass!" });
    }
};
