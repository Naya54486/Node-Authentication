var express = require("express");
var router = express.Router();

const credential = {
    email: "nudge@gmail.com",
    password: "nudge123"
}

//login route
router.post('/login', (req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        // res.end("Login Successful...!")
    } else {
        res.end("Invalid User Details")
    }
});

// dashboard route
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', {user:req.session.user})
    } else {
        res.send("Unauthorised User")
    }
})

//logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {title: "Express", logout: "Logged Out Successfully...!"})
        }
    })
})

module.exports = router;