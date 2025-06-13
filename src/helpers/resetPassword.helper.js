import { transport } from "./sendEmail.helper.js"
import { createHash } from "./hash.util.js"
import usersService from "../services/users.services.js"

const resetPassword = async (email) => {

    try {

        const emailCrypto = createHash(email)
        const user = await usersService.readBy({ email })

        await usersService.updateById(user._id, { verifyCode: emailCrypto })
        await transport.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to: email,
            subject: "Restablezca su contraseña en Sportienda",
            html: `
        <section>
        <h1>Solicitud para reestablecer contraseña</h1>
        <h2>Ingrese al siguiente vinculo para renovar su contraseña de cuenta Sportienda</h2>
        <a href="${process.env.URL}/resetpassword/${emailCrypto}"> Actualizar contraseña </a>
        </section>
        `    })

    } catch (error) {
        alert(error.message)
    }

}

export default resetPassword