import { transport } from "./sendEmail.helper.js"
import { createHash } from "./hash.util.js"

const resetPassword = async (email) => {

    try {

        const emailCrypto = createHash(email)

        await transport.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to: email,
            subject: "Restablezca su cuenta en Sportienda",
            html: `
        <section>
        <h1>Solicitud para reestablecer contraseña</h1>
        <a href="${process.env.URL}/resetPassword/${emailCrypto}"> Verificar </a>
        </section>
        `    })
    } catch (error) {
        alert(error.message)
    }

}

export default resetPassword