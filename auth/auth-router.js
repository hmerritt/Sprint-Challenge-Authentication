const router = require("express").Router();

router.post("/register", validateBody(), (req, res) => {
    // Get user info
    const { username, password } = req.body;
});

router.post("/login", validateBody(), (req, res) => {
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
        res.status(400).json({message: "Missing post data"});
    }
}

module.exports = router;
