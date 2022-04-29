import './genres.css'
import React, {useRef} from 'react'
import { UserContext } from '../../App'
import {NavLink} from 'react-router-dom'
import {options} from '../../data/data'
import {IoIosArrowDropleft, IoIosArrowDropright} from 'react-icons/io'


// ### directory in /src/components/genres/genre.jsx

// ### displayed on...
//     Home page at ../src/pages/home.jsx || route = '/'
//     Library page at ../src/pages/library.jsx || route = '/library'

export default function Genres(){
    //params are originated in App.js at /src/App.js
    const {user:[{user}],hidePopUpList, handleGenre: handleClickedGenre} = React.useContext(UserContext)
    const userVal = user

    //refers to className='genres-container' || genres from library
    const genreRef = useRef()

    //scroll to left and right 
    //onClick icon IoIosArrowDropleft || IoIosArrowDropright
    function scroll(scrollOffset) {
        genreRef.current.scrollLeft += scrollOffset;
    }
    
    if(userVal !== undefined){
       var username = userVal.Username.toUpperCase()
    }
    
    return(
        <div onClick = {hidePopUpList} className='Genres'>
            {
            user ? 
            (<h2> WELCOME {`${username}`} </h2>)
            :
            (<h2>Welcome</h2>)
            }  
            <div ref={genreRef} className='genres-container'>
             
                {options.map((opt) => 
                <NavLink to='/library' className='genres-navlink' key={opt.value} >
                    <div className='genre' onClick={handleClickedGenre} title={opt.img} key={opt.value} id={opt.value}  >
                        <img className='genre-img' alt="unavailable" id={opt.value} title={opt.img} src={opt.img}/>
                        <h4 className='genre-text'  id={opt.value} title={opt.img} >{opt.text}</h4>
                    </div>
                </NavLink>
                )}
                
            </div>
            <div className='scroller-container'>
                <IoIosArrowDropleft onClick={() => scroll(-750)} className='scroll-left'/>
                <IoIosArrowDropright onClick={() => scroll(+750)} className='scroll-right'/>
            </div>
        </div>
    )
}
