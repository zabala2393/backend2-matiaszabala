import Routerhelper from "../../helpers/router.helper.js"
import cartsController from "../../controllers/carts.controller.js"

class CartsRouter extends Routerhelper {
    constructor() {
        super()
        this.init()
        this.controller = cartsController
    }

    init = () => {
        this.create('/', ["ADMIN", "USER"], cartsController.createOne)
        this.read('/', ["ADMIN"], cartsController.readAll)
        this.read("/:id", ["USER"], cartsController.readById)
        this.update("/:id", ["USER"], cartsController.updateById)
        this.destroy("/:id", ["USER"], cartsController.destroyById)
    }
}

const cartsRouter = new CartsRouter().getRouter()
export default cartsRouter