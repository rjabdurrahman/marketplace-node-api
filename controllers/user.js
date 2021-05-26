const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load User model
const User = require("../models/User");
const Profile = require("../models/Profile");
const Invitation = require("../models/Invitations");
const Post = require("../models/Post");

function register(req, res) {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const newUser = new User(req.body);
        console.log('UserId', newUser._id);
        const newProfile = new Profile({ user: newUser._id });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => {
                        newProfile.save();
                        res.json(user);
                    })
                    .catch(err => res.send(err.message));
            });
        });
    });
}

function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    // Find user by username
    User.findOne({ username }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "No user registed in this mail!" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    username: user.username,
                    type: user.type
                };
                // Sign token
                jwt.sign(payload, 'secret', { expiresIn: 31556926 },
                    (err, token) => {
                        res.json({
                            type: user.type,
                            username: user.username,
                            token: "Bearer " + token
                        });
                    }
                );
            }
            else {
                return res.status(400).json({ message: "Password Incorrect!" });
            }
        });
    });
}

function getAll(req, res) {
    User.find({ type: 2 })
        .then(data => {
            res.send(data);
        })
        .catch(err => console.log(err));
}

function invitation(req, res) {
    let invitation = new Invitation(req.body);
    invitation.save()
        .then(data => res.json({ "msg": "Invitation Sent" }))
        .catch(err => res.send(err));
}

function getAllInvitation(req, res) {
    Invitation.find({ username: req.user.username })
        .then(inv => {
            if (inv) {
                let postsList = [];
                inv.forEach(x => {
                    Post.findById(x.post)
                        .then(function (post) {
                            postsList.push(post);
                            res.json(postsList);
                        });
                });
            }
            else res.json(inv);
        })
        .catch(err => res.json(err));
}

module.exports = { register, login, getAll, invitation, getAllInvitation };