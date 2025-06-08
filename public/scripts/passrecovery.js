const passRecovery = async (event) => {

    event.preventDefault()

    try {
        const email = document.querySelector("#email").value
        const url = "/api/auth/resetpassword"
        let response = await fetch(url)
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