import { usersManager } from "../data/manager.mongo.js";

class UsersServices {
    constructor() {
        this.manager = usersManager
    }

    createOne= async(data) => await usersManager.createOne(data)
    readAll = async (filter) => await usersManager.readAll(filter)
    readById = async() => await usersManager.readById(id)
    updateById = async(id, data) => await usersManager.findByIdAndUpdate(id, data)
    destroyById = async(id)=> await usersManager.destroyByID(id)
}

const usersService = new UsersServices()
export default usersService