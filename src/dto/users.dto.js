import crypto, { createHash } from "crypto"
const {PERSISTENCE} = process.env

class UsersDTO {
    constructor(data) {
        if (PERSISTENCE!=="mongo") {
            this._id = crypto.randomBytes(12).toString("hex")
        }
        this.first_name = data.first_name
        this.age = data.age
        this.last_name = data.last_name
        this.email = data.email
        this.password = createHash(data.pasword)
        this.role = data.role || "USER"
        this.cart = data.cart
        if (PERSISTENCE!=="mongo") {
            this.createdAt = new Date()
            this.updatedAt = new Date()
        }        
    }
}

export default UsersDTO