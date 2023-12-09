const User= require('../models/user')

module.exports.profile=function(req,res){
    return res.render('profile',{title:"Profile"})
}

module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    })
}

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:'Codeial | Sign In'
    })
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

module.exports.createSession=function(req,res){

    
    
}