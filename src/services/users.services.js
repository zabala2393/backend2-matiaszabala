import  usersRepository from "../repositories/users.repository.js";

class UsersServices {
    constructor() {
        this.repository = usersRepository
    }

    createOne= async(data) => await this.repository.createOne(data)
    readAll = async (filter) => await this.repository.readAll(filter)
    readBy = async(filter) => await this.repository.readBy(filter)
    readById = async(id) => await this.repository.readById(id)
    updateById = async(id, data) => await this.repository.updateById(id, data)
    destroyById = async(id)=> await this.repository.destroyById(id)
}

const usersService = new UsersServices()
export default usersService