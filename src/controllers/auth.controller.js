import usersService from "../services/users.services.js";
import { verifyToken } from "../helpers/token.util.js";
import crypto from "crypto"

class AuthController {

    constructor() {
        this.service = usersService
    }
    registerCb = async (req, res) => { const message = "Registrado"; res.json201(null, message) }

    loginCb = async (req, res) => {
        const message = "Conectado"
        const opts = { maxAge: 7 * 24 * 60 * 60 * 1000, signed: true }
        res.cookie("token", req.user.token, opts).json200(req.user._id, message)
    }

    signoutCb = (req, res) => {
        const message = "Sesion cerrada"; res.clearCookie("token").json200(req.user._id, message)
    }

    onlineCb = async (req, res) => {

        const { token } = req.signedCookies
        console.log(token)
        const dataToken = verifyToken(token)

        let user = await this.service.readById(dataToken?._id)
        if (!user) {
            return res.json401("Credenciales no validas")
        }
        const { password, __v, createdAt, ...rest } = user
        res.json200(rest)
    }

    badAuthCb = (req, res) => {
        res.json401()
    }

    forbiddenCb = (req, res) => {
        res.json403()
    }

    verifyCb = async (req, res) => {
        const { email, verifyCode } = req.params
        const user = await this.service.readBy({ email, verifyCode })
        console.log(user)
        if (!user) {
            res.json404()
        }

        await this.service.updateById(user._id, { isVerified: true})
        res.json200({ isVerified: true })
    }

    resetPasswordCb = async (req, res) => {
        const { email } = req.body
        const user = await this.service.readBy({ email })
        if (!user) {
            res.json404({ message: "Este correo electronico no esta registrado, intente de nuevo" })
        }
        res.json200()
    }

    newPasswordCb = async (req, res) => {
        const { email } = req.params
        const { password } = req.body
        const user = await this.service.readBy({ email })
        if (!user) {
            res.json404()
        }
        await this.service.updateById(user._id, { password: password })
        res.json200({ password: password })
    }
}

const authController = new AuthController()
export default authController