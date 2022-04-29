import './leftnav-button.css'
import React from '../../App'
export default function LeftNavButton({text, color, icon}){

    const location = window.location.href
    if(location === "http://localhost:3000/" && text === 'Home'){
        color = 'white'
    }else if(location === 'http://localhost:3000/library' && text === 'Library'){
        color = 'white'
    }else if(location === 'http://localhost:3000/about' && text === 'About'){
        color = 'white'
    }
    else{
        color = 'rgb(138, 132, 132)'
    }   

    return(
        <div style={{color: `${color}`, '--hover-color': 'white'}} className='LeftNavButton-container'>
            <div  className='leftNav-icon'>
                {icon}
            </div>
            <div className='leftNav-text'>
                <h3 className='leftNav-text'>
                   {text} 
                </h3>        
            </div>

        </div>
    )

}