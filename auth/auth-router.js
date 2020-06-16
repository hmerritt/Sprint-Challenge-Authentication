const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../api/db");

router.post("/register", validateBody(), async (req, res, next) => {
    // Get user info
    const user = req.body;

    // Hash user's password
    user.password = bcrypt.hashSync(user.password, 12);

    try {
        // Add user to db
        const [userId] = await db.insert(user);

        // Return username of user
        res.send({ username: user.username });
    } catch (err) {
        next(err);
    }
});

router.post("/login", validateBody(), async (req, res, next) => {
    // Get user info
    const user = req.body;

    // Get user from db (by username)
    const [dbUser] = await db.get("username", user.username);

    // Compare password with one stored in db
    if (dbUser && bcrypt.compareSync(user.password, dbUser.password)) {
        // Create new JSON web token
        const token = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET || "sUpeR sEcret cOde",
            { expiresIn: "1h" }
        );

        // Send username and JWT
        res.send({ message: `Logged in: ${dbUser.username}`, token });
    } else {
        // Passwords did not match :(
        res.status(401).json({ message: "You shall not pass!" });
    }
});

// Validate required post data
function validateBody() {
    return (req, res, next) => {
        // Check request body exists
        if (req.body) {
            // Check required post data exists
            if (req.body.username && req.body.password) {
                return next();
            }
        }

        // No data sent
        res.status(400).json({ message: "Missing post data" });
    };
}

module.exports = router;
