import './topnav.css'
import {NavLink} from 'react-router-dom'
import TopNavButton from '../buttons/topnav-button'

//TopNav is displayed on every route...
//params {user, hidePopUpList} are passed from App.js
export default function TopNav({user, hidePopUpList}) {
    if(user !== undefined){
        var username = user.Username.toUpperCase()
    }

    return (
        <div onClick = {hidePopUpList}>
            <div className='TopNav'>
                <nav className='initials'>  
                {
                    user !== undefined &&

                    <NavLink className='nav-link' to='/profile'>
                        <TopNavButton route='/profile' className='black-button' text ={`${username}`} />
                    </NavLink> 

                }
                {
                    user ? 
                    (                              
                        <TopNavButton className ='black-button'  text = 'LOG OUT' />
                    )
                    :
                    (
                    <NavLink className='nav-link' to='/login'>                    
                        <TopNavButton route='/login' className ='white-button' text = 'LOG IN' />                   
                    </NavLink> 
                    )
                    
                }
                </nav>
            </div>
        </div>
    )
}