import express from "express";
import { authMiddleware } from "./middleware/authMiddleware";
import jwt  from "jsonwebtoken";
import { jwtSecret } from "@repo/backend-common/config";
import { signUpSchema, loginSchema, roomSchema } from "@repo/backend/scehma";
import { prismaClient } from "@repo/db/prisma";

const app = express();
app.use(express.json());
interface User {
    id: number;
    email: string;
    password: string;
}


let Rooms = []


app.get("/", (req, res) => {    
    res.send("Hello from http-backend!");
});
app.post("/signup", async(req, res) => {
    const data = signUpSchema.safeParse(req.body);
    if (!data.success) {
        return res.status(400).json(data.error);
    }
    const { email, password, name } = req.body;
    try {
        const findUser = await prismaClient.user.findUnique({
            where: { email }
        });
        if ( !findUser ) {
            res.send("user not found! signup instead")
        }else{
            const createUser = await prismaClient.user.create({
                data: {
                    email,
                    password,
                    name 
                }
            })

            res.send("user id " + createUser.id)
        }
    } catch (error) {
        
    }

})
app.post("/login",async (req, res) => {
    const data = loginSchema.safeParse(req.body);
    if(!data.success) {
        return res.status(400).json(data.error);
    }
    const { email, password } = req.body;
    try {
        const findUser = await  prismaClient.user.findUnique({
            where: {
                email
            }
        })
        if ( !findUser ) {
            res.send("user not found! signup instead")
        }
        else{
            if(findUser.password === password) {
                res.send("user id " + findUser.id)
            }
        }
    } catch (error) {
        res.send("something went wrong")
        
    }
    const userId = 235861;
    const jwtToken = jwt.sign( { userId }, jwtSecret);
    
    res.send({ message: "login successfully", token: jwtToken })
})
app.post("/createRoom", authMiddleware, async (req, res) => {
    const data = roomSchema.safeParse(req.body);
    if (!data.success) {
        return res.status(400).json(data.error);
    }


    const { slug, userId } = req.body;

    if (!slug) {
        return res.status(400).json({ message: "slug is required" });
    }

    try {
        const room = await prismaClient.room.create({
            data: {
                slug,
                admin: {
                    connect: { id: req.userId }
                }
            }
        });

        res.send("room id " + room.id);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(8000, () => {
    console.log("http-backend listening on port 8000");
});