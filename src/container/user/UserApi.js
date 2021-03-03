export const signinUser = async(user) => {
    try{
        return await fetch("http://localhost:4000/user/login", {
            method: 'POST',
            headers: {
                Accept:  "application/json",
               "Content-Type": "application/json"
                },
            body: JSON.stringify(user)
        }).then(response => response.json())
    } catch(error) {               
        console.log(error)
      }  
    } 

