import express from "express";
import { authMiddleware } from "./middleware/authMiddleware";
import jwt  from "jsonwebtoken";
import { jwtSecret } from "./config";

const app = express();
app.use(express.json());


let Rooms = []


app.get("/", (req, res) => {    
    res.send("Hello from http-backend!");
});
app.post("/signup",(req, res) => {
    const { email, password } = req.body;
    //const findUser = users.find(user => user.email === email && user.password === password)
    // if ( !findUser ) {
    //     users.push({ email, password })
    //     res.send("signup successfully")
    // }else{
    //     res.send("user already exist! login instead")
    // }

})
app.post("/login",(req, res) => {
    const { email, password } = req.body;
    //const findUser = users.find(user => user.email === email && user.password === password)
    // if ( !findUser ) {
    //     res.send("user not found! signup instead")
    // }else{

    //     res.send("login successfully")
    // }
    const userId = 235861;
    const jwtToken = jwt.sign( { userId }, jwtSecret);
    
    res.send({ message: "login successfully", token: jwtToken })
})
app.post("/createRoom", authMiddleware ,(req, res) => {
    const { roomName } = req.body;
    const createdRoom = {
        roomName: Rooms.push(roomName),
    }

    
    res.send("room created successfully")
})

app.listen(8000, () => {
    console.log("http-backend listening on port 8000");
});