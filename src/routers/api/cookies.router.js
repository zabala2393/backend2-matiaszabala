import Routerhelper from "../../helpers/router.helper.js"

const createCb = (req, res, next) => {
    try {   
        const message = "Cookie creada"
        res
            .cookie("user_id", "123456abcdef", { maxAge: 7 * 24 * 60 * 60 * 1000 })
            .cookie("role", "admin", {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                signed: true,
            })
            .json201(message)
    } catch (error) {
        next(error)
    }
}

const readCb = (req, res, next) => {
    try {
        const message = "Cookie leida"
        const cookies = { common: req.cookies, signed: req.signedCookies }
        res.json200(message,cookies)
    } catch (error) {
        next(error)
    }
}

const clearCB = (req,res,next) => {
    try {
        const message = "Cookie limpiada"
        res
        .clearCookie("user_id")
        .clearCookie("role")
        .json200(null, message)
    } catch (error) {
        next(error)
    }
}

class CookiesRouter extends Routerhelper {
    constructor() {
        super()
        this.init()
    }

    init = () => {
        this.create('/create', ["USER","ADMIN"], createCb)
        this.read('/read',["USER", "ADMIN"], readCb)
        this.destroy("/clear", ["USER","ADMIN"], clearCB)
    }
}

const coookiesRouter = new CookiesRouter().getRouter()
export default coookiesRouter