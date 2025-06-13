import usersController from "../../controllers/users.controller.js"
import Routerhelper from "../../helpers/router.helper.js"

class UsersRouter extends Routerhelper {
    constructor() {
        super()
        this.init()
        this.controller = usersController
    }

    init = () => {
        this.create('/', ["PUBLIC"], usersController.createOne)
        this.read('/', ["ADMIN"], usersController.readAll)
        this.read("/:id",["ADMIN", "USER"], usersController.readById)
        this.update("/:id",["USER"], usersController.updateById)
        this.destroy("/id", ["USER", "ADMIN"], usersController.destroyByID)
    }
}
const usersRouter = new UsersRouter().getRouter()
export default usersRouter