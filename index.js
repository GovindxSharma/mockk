const express= require('express')
const app=express();
const port=8080;
const expressLayouts=require('express-ejs-layouts')

app.use(expressLayouts)

app.use('/',require('./routes'))

app.set('view engine','ejs')

app.set('views','./views')



app.listen(port,()=>console.log(`Server is running at port : ${port} `))