import { createTransport } from "nodemailer";

const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS
    }
})

export { transport }

const sendEmail = async (email) => {
    await transport.sendMail({
        from: process.env.GOOGLE_EMAIL,
        to: email,
        subject: "Mail de prueba",
        html: "<h1>Correo de prueba</h1>"

    })
}

export default sendEmail