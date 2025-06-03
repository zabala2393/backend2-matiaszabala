const verify = async() => {
    try {
        const email = document.querySelector(`#email`).value
        const verifyCode = document.querySelector(`#code`).value
        const url = `/api/auth/verify/${email}/${verifyCode}`
        let response = await fetch(url)
        
    } catch (error) {
        alert(error.message)
    }
}