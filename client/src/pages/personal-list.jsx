import './personal-list.css'
import {useState, useEffect} from 'react'
import {FaYoutube} from 'react-icons/fa'
import Intro from '../components/intro/intro'
import {MdOutlineDeleteOutline} from 'react-icons/md'

// ### Page PersonalList is located at...
//     .. ../src/pages/personal-list.jsx || route '/list'

// params {viewList, user} are passed from App.js
export default function PersonalList({viewList, user}){


    // ### when page is refreshed list id or viewList..
    //     .. becomes undefined && nothing is displayed on page
    //     .. to prevent such a behavior user is redirected to Profile page
    function redirect(){
        if(viewList === undefined){
            window.location = '/profile'
        }   
    }
    redirect()

    if(user !== undefined){
        var id = user._id
    }

    // ### finds user list with matching id with viewList 
    //     .. then sets fetched data = userList to map out songs with in
    const [userList, setUserList] = useState('')     
    useEffect(()=> {

        const findList = async()  => {
        try {
            if(viewList !== undefined){
            const res = await fetch(`http://localhost:4000/users/${id}/user/lists/${viewList}/list`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type' : 'applciation/json',
                'Access-Control-Allow-Credentials': true
                }
            })
            const json = await res.json()
            const data = await json
            setUserList(await data) 
            }else{
                window.location = '/profile'
            }
            } catch (error) {
                return console.log(error)  
            }
        }
        findList()

    })
    if(userList !== undefined){
        var Songs = userList.Songs
        var ListName = userList.ListName
    }
    if( Songs !== undefined){
        var FirstSong = Songs[0]
        var SongsLength = Songs.length
    }


    // ### onMouseEnter to MdOutlineDeleteOutline icon 
    //     ..with className='delete-icon'  
    //     .. sets id of song requested to be delted = songID
    const [songID, setSongID] = useState()
    const handleDeleteList = (e) => {setSongID(e.target.id)}    

    // ### onClick upon MdOutlineDeleteOutline icon 
    //     ..with className='delete-icon'
    //     ..func deleteSong is called
    const deleteSong = () => {
        fetch(`http://localhost:4000/users/${id}/user/lists/${viewList}/list/delete/${songID}`,
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
        })        
    }

    return(
        <div >
        {SongsLength > 0  &&
        <div className='List'>
            <Intro description='PLAYLIST' src={FirstSong.SongImg} background={{background:'linear-gradient(rgb(39, 29, 100),30% ,rgb(24, 23, 23))'}} title={ListName}/>
            <div className='list-container'>
                <div className='songs-header-container'>
                    <div className='songs-header'>
                        <p><b>cover</b></p>
                        <p><b>title</b></p>
                        <p><b>listen on YT</b></p>
                        <p><b>delete</b></p> 
                    </div>
                </div>
                                   
                <ol type = '1' className='list-songs'>
                    {Songs.map((song) => 
                    <li className='list-song' id = {song._id} key= {song._id}>
                        <img alt = "a" className='list-song-img' src ={song.SongImg} />
                        <div className='list-song-text'>
                            <p className='list-song-name'><b>{song.SongName.split('-')[1]}</b></p>
                            <p className='list-song-artist'>{song.SongName.split('-')[0]}</p>
                        </div>
                        <a rel="noreferrer" href={`${song.SongLink}`} className='youtube-icon-container' target='_blank'>
                            <FaYoutube className='youtube-icon'/>
                        </a>
                        <MdOutlineDeleteOutline className='delete-icon' id = {song._id} onClick = {deleteSong} onMouseEnter = {handleDeleteList}/>
                    </li>
                    )}
                </ol>
            </div>
        </div>         
        }

        {SongsLength < 1 &&
            <h3 className='List'>
                <p className='empty-text'>The List is empty</p>
            </h3>
        }                 
        </div>


    )
}