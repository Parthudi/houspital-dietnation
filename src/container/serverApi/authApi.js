export const authenticate = (data, next ) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('JWT', JSON.stringify(data))
        next()
    }
}

//very important API . It returns all users information
export const isAuthenticated = () => {
    if(typeof window === 'undefined') {
        return false
      }
     if(localStorage.getItem("JWT")) {
         return JSON.parse(localStorage.getItem('JWT'))
         } else{
             console.log("failed");
             return false
         }
    } 

export const SignOut = async (userid, token ) => {
        try{       
            if(typeof window !== 'undefined') {
                localStorage.removeItem('JWT')
    
            return await fetch(`http://localhost:4000/user/logout/${userid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                }
             }).then(response =>  response.json()) 
            } 
          } catch(error) {
              console.log(error)
          }
        }

export const Deleteaccount = async (userid, token) => {
    try{            
            return await fetch(`http://localhost:4000/user/delete/${userid}`, {
                method: "DELETE",
                headers: {
                    "Authorization" : `Bearer ${token}`
                  }
                }).then(response =>  response.json()) 
             } 
             catch(error) {
                console.log(error)
        }
    }