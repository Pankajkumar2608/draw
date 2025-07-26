import express from "express";

const app = express();

app.get("/", (req, res) => {    
    res.send("Hello from http-backend!");
});

app.listen(3000, () => {
    console.log("http-backend listening on port 3000");
});