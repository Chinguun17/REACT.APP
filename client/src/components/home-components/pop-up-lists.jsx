import './pop-up-lists.css'
import {AiFillCloseCircle} from 'react-icons/ai'
import React ,{useState} from 'react'
import { UserContext } from '../../App'
import Input from '../../components/input/input'
import {useForm} from 'react-hook-form'

// ### Component PopUpLists is located at ..
//     .. ../src/components/home-components/pop-up-lists.jsx

// ### displayed on ..
//     .. Home page at ..src/pages/home.jsx || route = '/'
//     .. Profile page at ..src/pages/profile.jsx || route = '/profile'
//     .. Library page at ..src/pages/library.jsx || route = '/library'

// ### param {generatedSong} is passed from..
//     .. Home page at ../src/pages/home.jsx || route = '/'
export default function PopUpLists({ generatedSong }){

    //params are originated in App.js at ../src/App.js
    const {user:[{user}], list:[showLists], genreSong: [genreSong],addListIcon:[addToListIconClicked]} = React.useContext(UserContext)

    const [clickedListID, setClickedListID] = useState('')   
    const getListID = (event) => {
        setClickedListID(event.target.id)
    }
    


    var url = window.location.pathname
    const {handleSubmit} = useForm()
    let SongName = null
    let SongLink = null
    let SongImg = null

        
    if(user !== undefined){
        var userLists = user.Lists
    }

    if(userLists !== undefined){
        var listsLength = userLists.length
    }

    if(user !== undefined){
        var id = user._id
    }

    if(clickedListID !== undefined){
        var id1 = clickedListID
    }  



    // set listName = value of input onChange 
    const [listName, setListName] = useState('')    

    //func for ensuring input for name of new list is not empty
    function isNullOrWhitespace( input ) {
        return !input || !input.trim();
    }

    // ### if listName == isNullOrWhitespace...
    //     .. listStatus = error || else ..
    //     .. listStatus = success
    const [listStatus, setListStatus] = useState(undefined)

    // ### boolean val for showing flash message..
    //     .. for success || error status via setTimeOut
    const [showNotif, setShowNotif] = useState(false)

    const addList = async() => {
        try {
            if(!isNullOrWhitespace(listName)){
                await fetch(`http://localhost:4000/users/${id}/user/newList`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    listname: listName
                })
            })
            setShowNotif(true)
            setListStatus({type:'success'})
            var Timer = setTimeout(() => setShowNotif(false), 2000)
            Timer = setTimeout(() => setListStatus(undefined), 2000)
            return () => {clearTimeout(Timer)}            
            }else{
                setShowNotif(true)
                setListStatus({ type: 'error' }) 
                Timer = setTimeout(() => setShowNotif(false), 2000)
                Timer = setTimeout(() => setListStatus(undefined), 2000)
                return () => {clearTimeout(Timer)}                   
            }  

        } catch (error) {
            console.log(error)
        }
    }


    // ### if genreSong == isNullOrWhitespace due to error...
    //     .. songStatus = error || else ..
    //     .. songStatus = success
    const [songStatus, setSongStatus] = useState(undefined)

    const addSongToList = async() => {
        if(genreSong !== undefined){
            var songInfo = [genreSong]
        }        

        if(url === '/'  ){
            SongName = generatedSong[1]
            SongLink = generatedSong[0]
            SongImg = generatedSong[2]
        }

        if(url === '/library'){ 
            SongName = songInfo[0].split(',')[1]
            SongLink = songInfo[0].split(',')[0]
            SongImg = songInfo[0].split(',')[2]                    
        }

        if(url ==='/' || url === '/library'){
            try {
                
                if(!isNullOrWhitespace(SongName, SongLink, SongImg)){
                    await fetch(`http://localhost:4000/users/${id}/user/lists/${id1}/list/addSong`,
                    {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        songname: SongName,
                        link: SongLink,
                        img: SongImg
                        })
                    })
                    setShowNotif(true)
                    setSongStatus({type:'success'})
                    var Timer = setTimeout(() => setShowNotif(false), 2000)
                    Timer = setTimeout(() => setSongStatus(undefined), 2000)
                    return () => {clearTimeout(Timer)}                 
                }else{
                setShowNotif(true)
                setSongStatus({ type: 'error' }) 
                const Timer = setTimeout(() => setShowNotif(false), 2000)
                return () => {clearTimeout(Timer)}             
                }  
            }catch(error){
            console.log(error)
            }            
        }                      
    }
    

    return(
        <div>
            {showLists === true &&
                <div className='popup-lists-container'>
                
                    {user ? 
                    (
                    <div className='PopUp-Lists'>
                        <div className='close-lists'>
                            <h2>Your Lists </h2>
                            <AiFillCloseCircle onClick ={addToListIconClicked} className='close-lists-icon'/>
                        </div>

                        <form onSubmit={handleSubmit(addList)}className='lists-container'>
                            <div className='addList-container'>
                            <Input                         
                            type = 'text'
                            placeholder = 'Make a list here !'                
                            onChange={((e) => setListName(e.target.value))}
                            />

                            <button type="submit" className='addList-button'>Add List</button>                        
                            </div>
                            {showNotif === true &&
                            <>
                                {listStatus?.type === 'success' && <p>list added successfully!</p>}
                                {listStatus?.type === 'error' && <p>something went wrong.. Please try again</p>}
                                {songStatus?.type === 'success' && <p>song  added successfully!</p>}
                                {songStatus?.type === 'error' && <p>something went wrong.. Please try again</p>}                                
                            </>                             
                            }
                             
                            
                          
                            {listsLength < 1 &&
                                'You do not have lists yet!'
                            }
                            {listsLength > 0 &&
                                <ul className='lists'>
                                    {userLists.map((userList) => 
                                        <li 
                                        className = 'list'
                                        id={userList._id}
                                        key = {userList._id}
                                        onClick={addSongToList} 
                                        onMouseEnter={getListID}
                                        >
                                            {userList.ListName}
                                        </li>
                                    )}
                                </ul>
                            }
                        </form>
                    </div>                    
                    )
                    :
                    (
                        <div className='PopUp-Lists'>
                            <div className='close-lists'>                            
                                <h2>Login to make lists</h2>                    
                                <AiFillCloseCircle onClick ={addToListIconClicked} className='close-lists-icon'/>
                            </div>
                        </div>   
                    )
                    }
                </div>
            }
        </div>

    )
}