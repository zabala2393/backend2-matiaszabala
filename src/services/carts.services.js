import cartsRepository from "../repositories/carts.repository.js";

class CartsService {
    constructor() {
        this.repository = cartsRepository
    }

    createOne = async (data) => await cartsRepository.createOne(data)
    readAll = async (filter) => await cartsRepository.readAll(filter)
    readById = async () => await cartsRepository.readById(id)
    readBy = async (filter) => await cartsRepository.readBy(filter)
    updateById = async (id, data) => await cartsRepository.findByIdAndUpdate(id, data)
    destroyById = async (id) => await cartsRepository.destroyById(id)
}

const cartsService = new CartsService()
export default cartsService