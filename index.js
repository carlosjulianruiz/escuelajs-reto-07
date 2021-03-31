const http      =require('http');
const express   = require('express');
 
const app       = express();
const port      = 8080;
const path      =require('path');
const bodyParser =require('body-parser')

app.use(express.static('./dist'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./dist/index.html'));
    console.log(__dirname);
});

app.post('/save',(req,res)=>{
console.log(req.body);
});

app.listen(port, ()=>console.log(`app running port ${port}`));



