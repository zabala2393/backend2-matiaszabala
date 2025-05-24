import { cartsManager } from "../data/manager.mongo.js";

class CartsService {
    constructor() {
        this.manager = cartsManager
    }

    createOne= async(data) => await cartsManager.createOne(data)
    readAll = async (filter) => await cartsManager.readAll(filter)
    readById = async() => await cartsManager.readById(id)
    updateById = async(id, data) => await cartsManager.findByIdAndUpdate(id, data)
    destroyById = async(id)=> await cartsManager.destroyById(id)
}

const cartsService = new CartsService()
export default cartsService