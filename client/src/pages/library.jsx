import './library.css'
import React from 'react'
import { UserContext } from '../App'
import {FaYoutube} from 'react-icons/fa'
import {BiAddToQueue}  from 'react-icons/bi'
import Genres from '../components/genres/genres'
import PopUpLists from '../components/home-components/pop-up-lists'
import Intro from '../components/intro/intro'

// ### Page Library is located at...
//     .. ../src/pages/library.jsx || route '/library'


// param {hidePopUpList} is passed from App.js
export default function Library({hidePopUpList}){

    //param are originated in App.js at /src/App.js  
    const { genre:[clickedGenre], addListIcon: [addToListIconClicked], genreSongs: [genreSongs], genreImg } = React.useContext(UserContext)

    //when no genre is selected introImgDef is set as default img at intro
    const introImgDef = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDYM4tLBIsQ6co2VEMv47tLJ9EHd8NkJRb3Q&usqp=CAU'

    return(
        <div onLoad={hidePopUpList} className='Library'>
            <div className='library-container'>
                <PopUpLists />
                <Genres />
                <Intro src = {`${genreImg}`} introImgDef = {introImgDef} description='GENRE' title={clickedGenre}background={{backgroundImg:''}}/>
                <div className='songs-header-container1'>
                    <div className='songs-header1'>
                        <p><b>cover</b></p>
                        <p><b>title</b></p>
                        <p className='testt'><b>add to list</b></p>
                        <p className='listen-text'><b>listen on YT</b></p> 
                    </div>
                    
                </div>
                {genreSongs.length > 0 &&
                    <ol className='library-songs'>
                        {genreSongs.map((song) => 
                            <li className='library-song'  id = {song} key={song[0]}>
                                <img className='library-song-img' alt = "unavailable" src={song[2]}/>
                                <div className='library-song-text'>
                                    <p className='library-song-name'><b>{song[1].split('-')[1]}</b></p>
                                    <p className='library-song-artist'>{song[1].split('-')[0]}</p>
                                </div>
                                <BiAddToQueue className='addListIcon' onClick = {addToListIconClicked} id = {[song]} />
                                <a rel="noreferrer" href={`${song[0]}`} target='_blank'>
                                    <FaYoutube className='youtube-icon'/>
                                </a>
                            </li>
                        )}
                    </ol>
                
                }
            </div>
        </div>
    )
}