const { response } = require("express");
const User = require("../models/user");

module.exports.profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id).exec();

    if (!user) {
      console.error("User not found");
      return res.status(404).send("User not found");
    }

    return res.render("profile", { title: "Profile", profile_user: user });
  } catch (err) {
    console.error("Error finding user:", err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports.update = async function (req, res) {
  try {
      // Check if the logged-in user is the owner of the profile
      if (req.user.id === req.params.id) {
          const user = await User.findByIdAndUpdate(req.params.id, req.body).exec();

          if (!user) {
              console.error('User not found');
              return res.status(404).send('User not found');
          }

          return res.redirect('back');
      } else {
          console.log('Unauthorized update attempt.');
          return res.status(401).send('Unauthorized');
      }
  } catch (err) {
      console.error('Error updating user:', err);
      return res.status(500).send('Internal Server Error');
  }
};


module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("profile");
  }

  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("profile");
  }

  return res.render("user_sign_in", {
    title: "Codeial | Sign IN",
  });
};

module.exports.create = async function (req, res) {
  try {
    // Matching pass and confirm pass; if not match, go back to sign up
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect("back");
    }

    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email: req.body.email });

    // If user not found, create a new user
    if (!existingUser) {
      const newUser = await User.create(req.body);
      return res.redirect("/users/sign-in");
    } else {
      // If user already exists, go back to sign up
      return res.redirect("back");
    }
  } catch (error) {
    console.error("Error in creating user:", error);
    return res.redirect("back");
  }
};

module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("Error in logging out:", err);
      return;
    }
    return res.redirect("/");
  });
};
