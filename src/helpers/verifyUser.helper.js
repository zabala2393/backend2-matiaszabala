import { createHash } from "./hash.util.js"
import { transport } from "./sendEmail.helper.js"

const verifyUserEmail = async (email, verifyCode) => {

    try {

        const emailCrypto = createHash(email)

        await transport.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to: email,
            subject: "Correo de verificacion de cuenta",
            html: `
        <section>
        <h1>Correo de verifacion de cuenta</h1>
        <h3>Codigo de verificacion: ${verifyCode}</h3>
        <a href="${process.env.URL}/verify/${emailCrypto}"> Verificar </>
        </section>
        `
        })
    } catch (error) {
        alert(error.message)
    }

}

export default verifyUserEmail