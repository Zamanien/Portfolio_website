const express = require('express');
const app = express(); 
require('dotenv').config();
const PORT = process.env.PORT || 8080; 


//Allows the use of JSON (for POST requests)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// server static files
app.use(express.static('frontend', { extensions: ['html'] }))

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