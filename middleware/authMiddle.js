const {getUser} = require("../service/authService");

async function restrictLoggedInUserOnly(req, res, next) {
    const token = req.cookies?.token;
    
    if (!token) return res.redirect("/login");
    
    const user = getUser(token);

    if (!user) return res.redirect('/login');

    req.user = user;
    next();
}

module.exports = { restrictLoggedInUserOnly };