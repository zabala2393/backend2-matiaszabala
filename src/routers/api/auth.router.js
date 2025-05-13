import { usersManager } from "../../data/manager.mongo.js"
//import passport from "../../middlewares/passport.mid.js"
import { verifyToken } from "../../helpers/token.util.js"
import passportCb from "../../middlewares/passportCb.mid.js"
import Routerhelper from "../../helpers/router.helper.js"

const registerCb = async (req, res) => { const message = "Registrado"; res.json201(null, message) }

const loginCb = async (req, res) => {
    const message = "Conectado"
    /* configurar la cookie con los datos del usuario */
    const opts = { maxAge: 7 * 24 * 60 * 60 * 1000, signed: true }
    /* enviar respuesta al cliente */
    const { user } = req
    res
        .cookie("token", user.token, opts)
        .json200(req.user._id, message)

}

const signoutCb = (req, res) => {
    const message = "signed out"
    /* eliminar cookie y enviar respuesta*/
    res
        .clearCookie("token")
        .json200(user._id, message)

}

const onlineCb = async (req, res) => {
    /* validar usuario conectado mediante cookies */
    const { token } = req.signedCookies
    const dataToken = verifyToken(token)
    /* usuario existe */
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
        this.create("/login",["USER", "ADMIN"], passportCb("login"), loginCb)
        this.create("/signout",["USER", "ADMIN"], passportCb("user"), signoutCb)
        this.read("/online",["USER", "ADMIN"], onlineCb)
        this.read("/bad-auth",["PUBLIC"], badAuthCb)
        this.read("/forbidden",["PUBLIC"], forbiddenCb)
        this.read("/google",["PUBLIC"], passportCb("gooogle", { scope: ["email", "profile"] }))
        this.read("/google/redirect",["PUBLIC"], passportCb("google"), loginCb)

    }
}

const authRouter = new Authrouter().getRouter()
export default authRouter