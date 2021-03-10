import React,{Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {SignOut,isAuthenticated} from '../../container/serverApi/authApi'
import ShowImage from '../../container/user/ShowProfilepic'

//history-> current url path
const isActive = (history, path) => {
    if(history.location.pathname === path){
        return { color:"yellow" }
        } else{
            return { color:"lightblue"}
        }
}

const Menu = (props) => {
   const {user , token} = isAuthenticated()

    return(
        <ul className="nav" style={{fontSize: "23px"}} >

            {isAuthenticated() ?
            ( user.role === 'admin' ?
                       ( <li className='nav-item'>
                         <Link className='nav-link' style={isActive(props.history, '/admin/dashboard')} to= '/admin/dashboard'  >  
                            admin 
                         </Link>
                        </li>  )   :
                        (<li className='nav-item'>
                        <Link className='nav-link' style={isActive(props.history, '/user/app')} to= '/user/app'  >  
                             home
                        </Link>
                        </li>)  )  : null }

             {/* {isAuthenticated() ?  
                 (<li className='nav-item'>
                 <Link className='nav-link' style={isActive(props.history, '/dashboard')} to= '/dashboard'  >  
                      profile
                 </Link>
                 </li>)   : null} */}
                        
            {isAuthenticated() ?  
                ( <li className='nav-item'>
                    <span className='nav-link' style={{cursor : "pointer", color:"lightblue" }} onClick={() => 
                        SignOut(user._id, token).then(data =>  props.history.push('/') ) } > 
                            logout  
                    </span>
                </li>  )   :    
             
                ( <Fragment>
                    <li className='nav-item'>
                        <Link className='nav-link' style={isActive(props.history, '/signup')} to='/signup' > 
                            signup  
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' style={isActive(props.history, '/signin')} to='/signin' > 
                           signin  
                        </Link>
                    </li>
                </Fragment>  )   } 

                {isAuthenticated() ?
                (<li className="nav-item dropdown">
                <span className="nav-link  dropdown-toggle" data-toggle="dropdown" style={{cursor:"pointer", color:"lightblue"}}>  More items  </span>
                 <ul className="dropdown-menu">
                     <li><Link className="dropdown-item" to='/dashboard'> Edit Profile </Link></li>
                     <li><Link className="dropdown-item" to='/dietform'> know your Health </Link></li>
                     <li><Link className="dropdown-item" to='/dietform'> know your DIet </Link></li>
                     <li><Link className="dropdown-item" to='/dietform'>  online chat </Link></li>
                     <li><Link className="dropdown-item" to='/nearby/hospital'>
                          Nearby Hospitals 
                        </Link></li>
                 </ul>
             </li>)
                  : null
                    
            }

            {isAuthenticated() ? 
            (
             <ShowImage user={user} estyle={{maxHeight:"200px", maxWidth:"55px" , borderRadius:"50%",border:"2px 3px black"}}/>    
                   )    : null }
        </ul>
    )
}

export default withRouter(Menu)