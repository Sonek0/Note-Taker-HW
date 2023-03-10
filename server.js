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


// API Route for GET request
app.get("/api/notes", function(req, res){
    readFileAsync("./develop/db/db.json", "utf8").then(function(data){
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});


//API route for POST request
app.post("/api/notes", function(req, res) {
const note = res.body;
readFileAsync("./develop/db/db.json", "utf8").then(function(data){
    const notes = [].concat(JSON.parse(data));
    note.id = notes.length + 1
    notes.push(note);
    return notes
}).then(function(notes){
    writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
    res.json(note);
})
});


//API route for delete request
app.delete("api/notes/:id", function (req, res){
    const idToDelete = parseInt(req.params.id);
    readFileAsync("./develop/db/db.json", "utf8").then(function(data){
        const notes = [].concat(JSON.parse(data));
        const newNotesData = []
        for (let i = 0; i<notes.length; i++) {
            if(idToDelete !== notes [i].id) {
            newNotesData.push(notes[i])
            }
        }
        return newNotesData
    }).then(function (notes) {
        writeFileAsync("./develop/db/d.json", JSON.stringify(notes))
        res.send('Saved!')
    })
})