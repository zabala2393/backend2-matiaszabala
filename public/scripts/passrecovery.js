const passRecovery = async (req, res,next) => {

    try {

        const data = {
            email: document.querySelector("#email").value
        }

        const url = "/api/auth/resetpassword"

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
            alert(`Excelente! Recibira en su casilla un link para restablecer su contraseña`)
            location.replace('/')
        }
    } catch (error) {
        alert(error.message)
    }
}

document.querySelector("#botonRecuperar").addEventListener("click", passRecovery)