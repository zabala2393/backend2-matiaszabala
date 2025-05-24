import "./src/helpers/env.helper.js"
import express, { json, urlencoded } from "express"
import { engine } from 'express-handlebars'
import __dirname from "./utils.js"
import morgan from "morgan"
import cookieParser from 'cookie-parser'
import router from "./src/routers/index.router.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import pathHandler from "./src/middlewares/pathHandler.mid.js"
import dbConnect from "./src/helpers/dbConnect.helper.js"
import {Server} from "socket.io"
import argsHelpers from "./src/helpers/args.helpers.js"

let io = undefined

const server = express()
const port = process.env.PORT || 8080
const ready = async () => {
    console.log(`Server ready on port ${port}`)
    console.log("mode" + argsHelpers.mode)
    await dbConnect(process.env.URL_MONGO)
}
const serverHttp = server.listen(port, ready)
io = new Server(serverHttp)

server.engine("handlebars", engine())
server.set("view engine", "handlebars")
server.set("views", __dirname + "/src/views")

server.use(cookieParser(process.env.SECRET))
server.use(urlencoded({ extended: true }))
server.use(json())
server.use(express.static("public"))
server.use(morgan("dev"))

server.use("/", (req,res,next)=>{
    req.io=io,
    next()
} , router)
server.use(errorHandler)
server.use(pathHandler)

