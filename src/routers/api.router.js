import Routerhelper from "../helpers/router.helper.js"
import usersRouter from "./api/users.router.js"
import productsRouter from "./api/products.router.js"
import cartsRouter from "./api/carts.router.js"
import cookiesRouter from "./api/cookies.router.js"
import sessionsRouter from "./api/sessions.router.js"
import authRouter from "./api/auth.router.js"

class ApiRouter extends Routerhelper {
    constructor() {
        super()
        this.init()
    }

    init = () => {
        this.use("/users", usersRouter)
        this.use("/products", productsRouter)
        this.use("/carts", cartsRouter)
        this.use("/cookies", cookiesRouter)
        this.use("/session", sessionsRouter)
        this.use("/auth", authRouter)
    }

}

const apiRouter = new ApiRouter().getRouter()
export default apiRouter