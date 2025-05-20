const register = async (req,res,next) =>
{
    try {
        const data = {
            first_name: document.querySelector("#first_name").value,
            last_name: document.querySelector("#last_name").value,
            age: document.querySelector("#age").value,
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,        
        }

        const opts = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
        const url = "/api/auth/register"
        let response = await fetch(url, opts)
        response = await response.json()
        if(response.error) {
            alert(response.error)
        } else {
            location.replace("/login")
        }
    } catch (error) {
        alert(error.message)
    }
}

document.querySelector("#register").addEventListener("click", register)