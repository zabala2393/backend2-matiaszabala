import { Router } from "express"
import userRouter from "./api/user.router.js"
import productsRouter from "./api/products.router.js"
import cartsRouter from "./api/carts.router.js"
import cookiesRouter from "./api/cookies.router.js"
import sessionsRouter from "./api/sessions.router.js"

const apiRouter = Router()

apiRouter.use("/users", userRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/carts", cartsRouter)
apiRouter.use("/cookies", cookiesRouter)
apiRouter.use("/session", sessionsRouter)
export default apiRouter