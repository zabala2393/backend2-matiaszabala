class DaoMemory {
    constructor() {
        createOne = async (data) => { 

        }
        readAll = async (filtro) => {

         }
        readBy = async(data) => {

         }
        readById = async (id) => {

         }
        updateById = async (id, data) => {

         }
        destroyById = async (id) => {

         }
    }
}

const usersManager = new DaoMemory()
const cartsManager = new DaoMemory()
const productsManager = new DaoMemory()

export {usersManager, cartsManager, productsManager}
