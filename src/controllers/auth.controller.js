import usersService from "../services/users.services.js";
import { verifyToken } from "../helpers/token.util.js";
import resetPassword from "../helpers/resetPassword.helper.js";
import { createHash } from "../helpers/hash.util.js";

class AuthController {

    constructor() {
        this.service = usersService
    }
    registerCb = async (req, res) => {
        const message = "Registrado"
        res.json201(null, message)
    }

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

        await this.service.updateById(user._id, { isVerified: true })
        res.json200({ isVerified: true })
    }

    resetPasswordCb = async (req, res) => {
        const { email } = req.body
        const user = await this.service.readBy({ email })
        if (!user) {
            res.json404({ message: "Este correo electronico no esta registrado, intente de nuevo" })
        }
        await resetPassword(email)
        const opts = { maxAge: 60 * 60 * 1000, signed: true }
        res
        .cookie("token", req.user.token, opts).json200(req.user._id, message)
        .json200()
    }

    newPasswordCb = async (req, res) => {

        const { password } = req.body        
        const { token } = req.signedCookies
        console.log(token)
        const dataToken = verifyToken(token)

        let user = await this.service.readById(dataToken?._id)
        if (!user) {
            res.json404()
        }

        if (user.password === password) {
            res.json401("La contraseña ingresa no es valida. Ingrese una nueva")
        }

        const newHash = createHash(password)

        await this.service.updateById(user._id, { password: newHash })
        res.json200({ password: newHash })
    }
}

const authController = new AuthController()
export default authController