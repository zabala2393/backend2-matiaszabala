import Carrito from "./models/carritos.models.js"
import Producto from "./models/productos.models.js"
import Usuario from "./models/usuarios.models.js"

class ManagerMongo {
    constructor(model){
        this.model = model
    }
    createOne = async (data) => await this.model.create(data)
    readAll = async (filtro) => await this.model.find(filtro).lean()
    readBy = async(data) =>await this.model.findOne(data).lean()
    readById = async(id) =>await this.model.findById(id).lean()
    updateById = async(id) => await this.model.findByIdAndUpdate(id, data)
    destroyByID = async(id) => await this.model.findByIdAndDelete(id)
}

const usersManager = new ManagerMongo(Usuario)
const cartsManager = new ManagerMongo(Carrito)
const productsManager = new ManagerMongo(Producto)

export {usersManager, cartsManager, productsManager}
