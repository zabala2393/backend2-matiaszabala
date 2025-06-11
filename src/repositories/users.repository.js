import { usersManager } from "../dao/factory.js"
import USersDTO from "../dto/users.dto.js"

class UserRepository {
    constructor() {
        this.manager = usersManager
    }

    createOne= async(data) => await this.manager.createOne(new USersDTO(data))
    readAll = async (filter) => await this.manager.readAll(filter)
    readBy = async (filter) => await this.manager.readBy(filter)
    readById = async(id) => await this.manager.readById(id)
    updateById = async(id, data) => await this.manager.updateById(id, data)
    destroyById = async(id)=> await this.manager.destroyById(id)
}

const usersRepository = new UserRepository()
export default usersRepository