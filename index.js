import "./src/helpers/env.helper.js"
import express, { json, urlencoded } from "express"
import { engine } from 'express-handlebars'
import __dirname from "./utils.js"
import morgan from "morgan"
import cookieParser from 'cookie-parser'
import router from "./src/routers/index.router.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import pathHandler from "./src/middlewares/pathHandler.mid.js"
import { Server } from "socket.io"
import argsHelpers from "./src/helpers/args.helpers.js"
import cors from "cors"
import nodemailer from "nodemailer"
import twilio from "twilio"

let io = undefined

const server = express()
const port = process.env.PORT || 8080
const ready = async () => {
    console.log(`Server ready on port ${port}`)
    console.log("mode" + argsHelpers.mode)

}
const serverHttp = server.listen(port, ready)
io = new Server(serverHttp)

server.engine("handlebars", engine())
server.set("view engine", "handlebars")
server.set("views", __dirname + "/src/views")
const client = twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN )

server.use(cookieParser(process.env.SECRET))
server.use(urlencoded({ extended: true }))
server.use(json())
server.use(express.static("public"))
server.use(morgan("dev"))

server.get("/mail", async(req,res)=>{

    


})

server.get("/sms", async(req,res)=> {

    let result = await client.messages.create({
        body: "Mensaje de mi app backend",
        from: process.env.TWILIO_SMS_NUMBER,
        to: "+542944897843"
    })

    res.send({ status: "success", result: "Mensaje enviado"})
})

server.use("/", (req, res, next) => {
    req.io = io,
        next()
}, router)
server.use(cors({
    credentials: true,
    origin: `http:/localhost:${process.env.PORT}`
}))
server.use(errorHandler)
server.use(pathHandler)