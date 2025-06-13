const resetPassword = async (event) => {

    event.preventDefault()
    try {
        const newPassword = document.querySelector("#newPassword").value
        const repeatPassword = document.querySelector("#repeatPassword").value

        if (newPassword !== repeatPassword) {
            res.json400("Las contraseñas no son iguales, ingrese nuevamente")
        }

        const params = window.location.pathname.split('/')
        const emailCrypto = params[params.length - 1 ]

        const data = {
            password: newPassword
        }

        const url = `/api/auth/resetpassword/${emailCrypto}`

        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }

        let response = await fetch(url, opts)
        response = await response.json()
        if (response.error) {
            alert(response.error)
        } else {
            alert("Contraseña actualizada correctamente!! Ya puede iniciar sesion")
            location.replace('/login')
        }
    } catch (error) {
        alert(error.message)
    }
}

document.querySelector("#confirmButton").addEventListener("click", resetPassword)