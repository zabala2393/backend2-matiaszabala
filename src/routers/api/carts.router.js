import Routerhelper from "../../helpers/router.helper.js"
import passportCb from "../../middlewares/passportCb.mid.js"
import cartsService from "../../services/carts.services.js"


class CartsRouter extends Routerhelper {
    constructor() {
        super()
        this.init()
        this.service = cartsService
    }
    init = () => {

        this.create('/', ["USER", "ADMIN"], cartsService.createOne)
        this.read('/', ["USER", "ADMIN"],cartsService.readAll)
        this.read("/:id",["ADMIN"], cartsService.readById)
        this.update("/:id",["USER", "ADMIN"], cartsService.updateById)
        this.destroy("/id",["USER", "ADMIN"], cartsService.destroyById)
    }
}

const cartsRouter = new CartsRouter().getRouter()
export default cartsRouter