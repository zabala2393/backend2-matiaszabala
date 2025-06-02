import { cartsManager } from "../dao/mongo/dao.mongo.js";
import CartsDTO from "../dto/carts.dto.js";

class CartsService {
    constructor() {
        this.manager = cartsManager
    }

    createOne= async(data) => await cartsManager.createOne(new CartsDTO(data))
    readAll = async (filter) => await cartsManager.readAll(filter)
    readById = async() => await cartsManager.readById(id)
    updateById = async(id, data) => await cartsManager.findByIdAndUpdate(id, data)
    destroyById = async(id)=> await cartsManager.destroyById(id)
}

const cartsService = new CartsService()
export default cartsService