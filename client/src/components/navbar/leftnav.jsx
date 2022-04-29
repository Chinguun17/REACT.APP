import './leftnav.css'
import React from 'react'
import {NavLink} from 'react-router-dom'
import LeftNavButton from '../buttons/leftnav-button'
import { BsSpeaker } from 'react-icons/bs'
import { BiHomeAlt, BiLibrary } from 'react-icons/bi'
import {GoDiffAdded} from 'react-icons/go'
import {HiOutlineInformationCircle} from 'react-icons/hi'
import { UserContext } from '../../App'

//LeftNav is displayed on every route...
//params {setShowLists} is passed from App.js
export default function LeftNav({setShowLists}){
    //middleware func hidePopUpList is originated in App.js
    const {hidePopUpList} =React.useContext(UserContext)

    //middleware used when addList icon on LeftNav clicked only to add list.
    const addToListIconClicked2 = () => {
        setShowLists(clicked => !clicked)
    }  

    return(
        <div className='LeftNav'>
            <div onClick ={hidePopUpList} >
                <h1 className='initials'><span>< BsSpeaker /> GRM  </span></h1>  

                <li className='leftNav-elements' >
                
                <NavLink className='leftnav-link' to='/'>
                    <LeftNavButton icon={<BiHomeAlt/>} text = "Home" /> 
                </NavLink>

                <NavLink  className='leftnav-link'  to='/library'>
                    <LeftNavButton icon={<BiLibrary/>} text = "Library"/>
                </NavLink>  
                </li>              
            </div>
            <li onClick={addToListIconClicked2}  className='leftNav-elements' >
            <LeftNavButton icon={<GoDiffAdded/>} text = "Add List"/>
            </li>
            <li className='leftNav-elements'>
                <NavLink className='leftnav-link' to='/about'>
                    <LeftNavButton icon={<HiOutlineInformationCircle/>} text = "About" />
                </NavLink>
            </li>
        </div>
    )
}

