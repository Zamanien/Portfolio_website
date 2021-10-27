const express = require('express');
const app = express(); 
require('dotenv').config();
const PORT = process.env.PORT || 8080; 

//Allows app to handle JSON objects from POST requests
app.use(express.json());
//Allows the app to read incoming objects as Strings or Arrays
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/frontend"));

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/frontend/index.html');
});

//every url not specified before this - redirects to /index
app.get('/*', (req, res) => {
    return res.redirect('/index');
});

app.listen(PORT, (error) => {
    if (error) {  
        console.log(`Error:${error}`) 
    } else {
        console.log(`Running on port: ${PORT}`);
    }
})