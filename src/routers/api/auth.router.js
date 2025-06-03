import passportCb from "../../middlewares/passportCb.mid.js"
import Routerhelper from "../../helpers/router.helper.js"
import authController from "../../controllers/auth.controller.js"

class Authrouter extends Routerhelper {
    constructor() {
        super()
        this.init()
        this.controller = authController
    }

    init = () => {
        this.create("/register",["PUBLIC"], passportCb("register"), authController.registerCb)
        this.create("/login",["PUBLIC"], passportCb("login"), authController.loginCb)
        this.create("/signout",["USER", "ADMIN"], authController.signoutCb)
        this.create("/online",["USER", "ADMIN"], authController.onlineCb)
        this.read("/bad-auth",["PUBLIC"], authController.badAuthCb)
        this.read("/forbidden",["PUBLIC"], authController.forbiddenCb)
        this.read("/google",["PUBLIC"], passportCb("google", { scope: ["email", "profile"] }))
        this.read("/google/redirect",["PUBLIC"], passportCb("google"), authController.loginCb)
        this.read("/verify/:email/:verifyCode", ["PUBLIC"], authController.verifyCb)
    }
}

const authRouter = new Authrouter().getRouter()
export default authRouter