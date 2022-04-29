import './generator.css'
import {options, library} from '../../data/data'
import React ,{ useState } from 'react'
import {FaYoutube} from 'react-icons/fa'
import {BiAddToQueue}  from 'react-icons/bi'
import { UserContext } from '../../App'


// ### Component Generator is located at...
//     .. ../src/components/home-components/generator.jsx

// ### displayed only on...
//     .. Home page at ../src/pages/home.jsx || route = '/' 

// ### params { generatedSong, getGeneratedSong} are passed from...
//     .. Home page at ../src/pages/home.jsx || route = '/'
export default function Generator({ generatedSong, getGeneratedSong}){

    //param is originated in App.js at /src/App.js    
    const {addListIcon:[addToListIconClicked] } = React.useContext(UserContext)

    // ### img to be displayed as a default on generator banner
    //     when no song is generated
    const bannerImgDef = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5xYCnK7Z-EbWvfrql0axaUZTZjSNftMIwRg&usqp=CAU'

    // selectedValue = chosen genre
    const [selectedValue, setSelectedValue] = useState('')

    // ### middleware for selectedValue = chosen genre..
    //     .. onChange of options of select el || className='select'
    const handleSelectedChange = (event) => setSelectedValue(event.target.value)

    // ### loop through lirbrary of genres..
    //     .. to find a match to selected option
    //     .. then pick random song from matched genre
    //     .. then set random song = generatedSong
    function generate(){
        const length = library.length
        for(var i=0; i<=length; i++){
            if(selectedValue === library[i]){
                const genre = library[i]
                const index = library.indexOf(genre) + 1
                const list = library[index]
                var random = list[Math.floor(Math.random() * list.length)]
                getGeneratedSong(random)
            }
        }
    }

    return(
        <div className='Generator'>
            <div className='generator-container'>
                <select name='select'  onChange={handleSelectedChange} className='select'>
                    <option defaultValue>Choose the Genre</option>
                    {options.map((option) => 
                        <option value={option.value} key={option.value}>
                            {option.text}
                        </option>
                    )}
                </select>
                <span><button onClick={generate} className='generate-button'>Generate</button></span>

                <div className='generatedSong-container'>                
                    {generatedSong[0].length > 0 &&
                    <div >  
                        <img alt="unavailable" src = {`${generatedSong[2]}`}/>
                        <div className='song-info'>                    
                            <h2 className='song-title'>
                                {generatedSong[1]}
                            </h2> 
                            <div className='song-icons'>
                                <a href={`${generatedSong[0]}`} rel="noopener noreferrer" className='youtube-icon'  target='_blank'>
                                    <FaYoutube  />
                                </a>
                                <BiAddToQueue onClick={addToListIconClicked} />
                            </div>

                        </div>
                    </div>                           
                    }    
                    {generatedSong[0].length < 1 &&
                    <div>  
                        <img alt="unavailable" src = {bannerImgDef}/> 
                    </div>                           
                    }  
                    
                </div>

            
            </div>
        </div>

    )
}