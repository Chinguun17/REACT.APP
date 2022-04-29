import './login.css'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'


//Param {user} is passed from App.js
export default function Login({user}) {
    if(user){
        window.location.pathname = '/'
    }
    return(
        <div className='Login'>
            <div className='log-banner-container'>
                <FcGoogle className='google-logo'/>
                <div className='texts'>                    
                    <h3>To Create an Account</h3>    
                    <a href='http://localhost:4000/auth/google'>Authenticate with Google</a>           
                </div>  
            </div>
        </div>
    )
}