const user = require('../models/user');
const { v4: uuidv4 } = require('uuid'); 
const { setUser } = require("../services/auth"); // Importing setUser function from auth service

async function signup(req, res) {
    try {
        const { name, email, password } = req.body;
        await user.create({
            name,
            email,
            password
        });
        return res.redirect("/"); // Redirect to home after successful signup
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).render("signup", { error: "An error occurred during signup." });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const foundUser = await user.findOne({ email, password }); 
        if (!foundUser) {
            return res.render("login", { error: "Invalid credentials" });
        }
        const sessionId = uuidv4(); // Generate a unique session ID
        setUser(sessionId, foundUser); // Pass the logged-in user, not the model
        res.cookie("uid", sessionId);
        return res.redirect("/"); // Redirect to home after successful login
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).render("login", { error: "An error occurred during login." });
    }
}

module.exports = {
    signup,
    login
};