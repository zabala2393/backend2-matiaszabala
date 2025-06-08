const login = async (req, res, next) => {
    try {
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value            
        }

        const opts = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
        const url = "/api/auth/login"
        let response = await fetch(url, opts)
        response = await response.json()
        if(response.error) {
            alert(response.error)
        } else {
            location.replace("/")
        }
    } catch (error) {
        alert(error.message)
    }
}

document.querySelector("#login").addEventListener("click", login)

const redirect = async(req,res,next) => {
    try {
        location.replace("/passwordRecovery")
    } catch (error) {
        alert(error.message)
    }
}

document.querySelector("#passRecovery").addEventListener("click", redirect)

//const googleLogin = async (req,res,next) => {
    //try {
       // const url = "/api/auth/google/redirect"
      //  const opts = {
     //       method: "GET",
     //       headers: {"Content-Type": "application/json"}
      //  }

      //  let response = await fetch(url, opts)
      //  response = await response.json()
      //  if (response.error){
      //      alert(response.error)
      //  } else {
      //      location.replace("/")
     //   }
    //} catch (error) {
      // alert(error.message)
  //  }
//}

//document.querySelector("#loginGoogle").addEventListener("click", googleLogin)