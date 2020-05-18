const router = require("express").Router();
const bcrypt = require("bcryptjs");
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

router.post("/login", validateBody(), (req, res, next) => {
    // Get user info
    const { username, password } = req.body;
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
