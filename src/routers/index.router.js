import RouterHelper from "../helpers/router.helper.js"
import apiRouter from "./api.router.js"
import viewsRouter from "./views.router.js"

class IndexRouter extends RouterHelper {
    constructor() {
        super(),
            this.init()
    }
    init = () => {
        this.use("/api", apiRouter)
        this.use("/", viewsRouter)
    }
}

const router = new IndexRouter().getRouter()
export default router