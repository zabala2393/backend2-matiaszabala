import { usersManager } from "../dao/factory.js";
import USersDTO from "../dto/users.dto.js"

class UserRepository {
    constructor() {
        this.manager = usersManager
    }

    createOne= async(data) => await usersManager.createOne(new USersDTO(data))
    readAll = async (filter) => await usersManager.readAll(filter)
    readBy = async (filter) => await usersManager.readBy(filter)
    readById = async() => await usersManager.readById(id)
    updateById = async(id, data) => await usersManager.updateById(id, data)
    destroyById = async(id)=> await usersManager.destroyByID(id)
}

const usersRepository = new UserRepository()
export default usersRepository