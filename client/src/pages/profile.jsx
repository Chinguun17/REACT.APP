import './profile.css'
import React from 'react'
import Intro from '../components/intro/intro'
import PopUpLists from '../components/home-components/pop-up-lists'
import ProfileLists from '../components/profile-components/profile-lists'

// ### Page Profile is located at...
//     .. ../src/pages/profile.jsx || route '/profile'

// param {user, hidePopUpList} is passed from App.js
export default function Profile({user, hidePopUpList}){

    if(user !== undefined){
        var userName = user.Username
    }
    const introImgDef = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5xYCnK7Z-EbWvfrql0axaUZTZjSNftMIwRg&usqp=CAU'
    const listImgDef = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd-_lSWMDc3yPDlT6t8I4A0XzpY-g26Ta9Gw&usqp=CAU'
    return(
        <div onLoad={hidePopUpList} className='Profile'>
            <div className='profile-container'>
                <PopUpLists />
                <Intro 
                    description='PROFILE' 
                    introImgDef={introImgDef} 
                    background={{background:'linear-gradient(rgb(39, 29, 100),30% ,rgb(24, 23, 23))'}} 
                    title = {`${userName}`} 
                />
                
                <ProfileLists listImgDef = {listImgDef}/>
            </div>
        </div>
    )
}