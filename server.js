//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");


//handling async process
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


//setting up server
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//static middleware
app.use(express.urlencoded({extended: true}));


// API Route and GET request
app.get("/api/notes", function(req, res){
    readFileAsync("./develop/db/db.json", "utf8").then(function(data){
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});