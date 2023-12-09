module.exports.home=function(req,res){
    
    // res.cookie('user_id', 25)
    // console.log(req.cookies)
    return res.render('home',{title:"Home"})
}

