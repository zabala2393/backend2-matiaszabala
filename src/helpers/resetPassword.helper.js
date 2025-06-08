import { transport } from "./sendEmail.helper.js";

const resetPassword = async (email) => {
try {
        await transport.sendMail({
        from: process.env.GOOGLE_EMAIL,
        to: email,
        subject: "Restablezca su cuenta en Sportienda",
        html: `
        <section>
        <h1>Correo de verifacion de cuenta</h1>
        <a href="${process.env.URL}/resetPassword/${email}"> Verificar </a>
        </section>
        `    })
} catch (error) {
    alert(error.message)
}

}

export default resetPassword