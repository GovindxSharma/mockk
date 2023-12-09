const User= require('../models/user')



module.exports.profile = async function (req, res) {
    try {
        if (req.cookies.user_id) {
            const user = await User.findById(req.cookies.user_id);

            if (user) {
                return res.render('profile', { title: "Profile", user: user });
            }

           
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.error('Error in finding user by ID:', error);
        return res.redirect('/users/sign-in');
    }
};


module.exports.signUp=function(req,res){
    if(!req.cookies.user_id){
    return res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    })}else{
        return res.redirect('profile')
    }
}

module.exports.signIn=function(req,res){
    if(!req.cookies.user_id){
    return res.render('user_sign_in',{
        title:'Codeial | Sign In'
    })}else{
        return res.redirect('profile')
    }
}


module.exports.create = async function (req, res) {
    try {
        // Matching pass and confirm pass; if not match, go back to sign up
        if (req.body.password !== req.body.confirm_password) {
            return res.redirect('back');
        }

        // Check if user with the given email already exists
        const existingUser = await User.findOne({ email: req.body.email });

        // If user not found, create a new user
        if (!existingUser) {
            const newUser = await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            // If user already exists, go back to sign up
            return res.redirect('back');
        }
    } catch (error) {
        console.error('Error in creating user:', error);
        return res.redirect('back');
    }
};



//---------------USing MANUAL AUTH-------------------
module.exports.createSession = async function (req, res) {
    try {
        // Find user
        const user = await User.findOne({ email: req.body.email });

        // If user found, handle authentication
        if (user) {
            // Password does not match
            if (user.password !== req.body.password) {
                return res.redirect('back');
            }

            // Session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            // Handle user not found
            return res.redirect('back');
        }
    } catch (error) {
        console.error('Error in finding user in sign in:', error);
        return res.redirect('back');
    }
};


module.exports.destroySession=function(req,res){
    // Clear the user session cookie
    res.clearCookie('user_id');

    // Redirect to the home page or any other desired destination
    return res.redirect('/');
}