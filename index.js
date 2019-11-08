const http      =require('http');
const express   = require('express');
 
const app       = express();
const port      = 8080
const path      =require('path');
const bodyParser =require('body-parser')

app.use(express.static('./dist'));
app.use(express.static('./datos/'));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./dist/index.html'));
});

app.post("/data/",(req,res)=>{
    console.log(JSON.stringify(req.body));
    res.send("Hello");
})
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./dist/index.html'));
});
app.listen(port, ()=>console.log(`app running port ${port}`));



