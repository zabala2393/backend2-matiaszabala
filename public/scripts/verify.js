const verify = async (req, res) => {
    try {
        const email = document.querySelector(`#email`).value
        const verifyCode = document.querySelector(`#code`).value
        const url = `/api/auth/verify/${email}/${verifyCode}`
        let response = await fetch(url)
        if (response.error) {
            alert(response.error)
        } else {
            alert("Cuenta verificada! Ya puede iniciar sesion")
            location.replace("/")
        }

    } catch (error) {
        alert(error.message)
    }
}

document.querySelector("#verifyCode").addEventListener("click", verify)