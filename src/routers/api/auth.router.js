import { usersManager } from "../../data/manager.mongo.js"
import { verifyToken } from "../../helpers/token.util.js"
import passportCb from "../../middlewares/passportCb.mid.js"
import Routerhelper from "../../helpers/router.helper.js"

const registerCb = async (req, res) => { const message = "Registrado"; res.json201(null, message) }

const loginCb = async (req, res) => {
    const message = "Conectado"
    const opts = { maxAge: 7 * 24 * 60 * 60 * 1000, signed: true }
    res.cookie("token", req.user.token, opts).json200(req.user._id, message)
}

const signoutCb = (req, res) => {
    const message = "Sesion cerrada"
    res.clearCookie("token").json200(req.user._id, message)
}

const onlineCb = async (req, res) => {

    const { token } = req.signedCookies
    console.log(token)
    const dataToken = verifyToken(token)

    let user = await usersManager.readById(dataToken?._id)
    if (!user) {
        return res.json401("Credenciales no validas")
    }
    const { password, __v, createdAt, ...rest } = user
    res.json200(rest)
}

const badAuthCb = (req, res) => {
    res.json401()
}

const forbiddenCb = (req, res) => {
    res.json403()
}

class Authrouter extends Routerhelper {
    constructor() {
        super()
        this.init()
    }

    init = () => {
        this.create("/register",["PUBLIC"], passportCb("register"), registerCb)
        this.create("/login",["PUBLIC"], passportCb("login"), loginCb)
        this.create("/signout",["USER", "ADMIN"], signoutCb)
        this.create("/online",["USER", "ADMIN"], onlineCb)
        this.read("/bad-auth",["PUBLIC"], badAuthCb)
        this.read("/forbidden",["PUBLIC"], forbiddenCb)
        this.read("/google",["PUBLIC"], passportCb("google", { scope: ["email", "profile"] }))
        this.read("/google/redirect",["PUBLIC"], passportCb("google"), loginCb)
    }
}

const authRouter = new Authrouter().getRouter()
export default authRouter