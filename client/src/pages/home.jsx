import './home.css'
import React, {useState} from 'react'
import Genres from '../components/genres/genres'
import Generator from '../components/home-components/generator'
import PopUpLists from '../components/home-components/pop-up-lists'

// ### Page Home is located at...
//     .. ../src/pages/home.jsx || route '/'

// param {hidePopUpList} is passed from App.js
export default function Home({ hidePopUpList }){
    const [generatedSong, setGeneratedSong] = useState([''])
    const getGeneratedSong = (random) => setGeneratedSong(random)

    return(
        <div onLoad={hidePopUpList} className='Home'>
            <Genres />
            <Generator generatedSong={generatedSong} getGeneratedSong={getGeneratedSong}/>
            <PopUpLists generatedSong={generatedSong} />            
        </div>
    )
}