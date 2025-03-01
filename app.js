const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/restHiQDB');

const greetingSchema = {
    content: String
}

const Greeting = mongoose.model('Greetings', greetingSchema);

app.get("/greeting", (req,res) => {
    Greeting.find((err, foundGreetings) => {
        if(!err){
            res.send(foundGreetings)
            console.log(foundGreetings)
        } else {
            res.send(err)
        }
    })
  
})

app.post("/greeting", (req, res) => {
    const createGreeting = new Greeting({
        content: req.body.content
    })
    createGreeting.save((err) => {
        if(err){
            res.send(err);
        } else {
            res.status(201).send("Greeting added")
        }
    });
    
    
})

app.listen(3100, () => {
    console.log("Server is running on port 3100");
});

module.exports = app