import { transport } from "./sendEmail.helper.js";

const verifyUserEmail = async (email, verifyCode) => {

    await transport.sendMail({
        from: process.env.GOOGLE_EMAIL,
        to: email,
        subject: "Correo de verificacion de cuenta",
        html: `
        <section>
        <h1>Correo de verifacion de cuenta</h1>
        <h3>Codigo de verificacion: ${verifyCode}</h3>
        <a href="${process.env.URL}/verify/${email}"> Verificar </>
        </section>
        `
    })
}

export default verifyUserEmail