const express= require('express')
const cookieParser=require('cookie-parser')
const app=express();
const port=8080;
const expressLayouts=require('express-ejs-layouts')

const db=require('./config/mongoose')
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.set(express.static('./assets'))
app.use('/css', express.static('assets/css', { type: 'text/css' }));
app.use('/js', express.static('assets/js', { type: 'text/javascript' }));


app.use(expressLayouts)
app.set('layout extractStyles',true)

app.use('/',require('./routes'))

app.set('view engine','ejs')

app.set('views','./views')



app.listen(port,()=>console.log(`Server is running at port : ${port} `))