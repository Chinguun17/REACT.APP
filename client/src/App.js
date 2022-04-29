import './App.css'
import {Route, Routes} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import Login from './pages/login'
import TopNav from './components/navbar/topnav'
import LeftNav from './components/navbar/leftnav'
import Home from './pages/home'
import Profile from './pages/profile'
import Library from './pages/library'
import About from './pages/about'
import {library} from './data/data'
import PersonalList from './pages/personal-list'
export const UserContext = React.createContext()

function App() {

  // ### func -> getUser fetches req.user && ..
  //     .. sets fetched data = user..
  //     .. user is used for granting privileges for logged user.
  const [{user}, setUser] = useState([])
  useEffect(() => {
    const getUser = async() => {
      try {
        const res = await fetch('http://localhost:4000/user', {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          }
        })
        const json = await res.json()
        const data = json
        setUser(data)
      } catch (error) {
        return console.log(error)
      }
    }
    getUser()
  })

  // ### middleware func -> handleClickedGenre
  //     .. gets img and id(value) of clicked genre
  //     .. of component -> Genre on pages -> Home and Library 
  //     .. to be viewed on component -> Intro on page -> Library  
  const [genreImg, setGenreImg] = useState('')
  const [clickedGenre, setGenre] = useState('alternatives')
  const handleClickedGenre = (event) =>{
    setGenre(event.target.id)
    setGenreImg(event.target.title)      
  } 

  // ### middleware func -> getSongs finds matching value 
  //     ..with clickedGenre from library of genres
  //     ..then sets matched genre songs = genreSongs
  //     .. to be mapped out on page -> Library
  const [genreSongs, setGenreSongs] = useState([])  
  useEffect(() => {
    function getSongs(){
      const length = library.length
      for(var i = 0; i <= length; i++){
          if(clickedGenre !== '' && clickedGenre === library[i]){
              const genre = library[i]
              const index = library.indexOf(genre) + 1
              const list = library[index]
              setGenreSongs(list)
              return
          }
      }
    }
    getSongs()
  })  

  // ### middleware func -> addToListIconClicked is called
  //     .. onClick upon add-song-to-list || add-list icons on
  //     .. components -> LeftNav && Generator(at Home) || page -> Library 
  //     .. shows and hides pop-up-lists banner
  // ### .. on page -> Library sets genreSong = clicked song(id = song)
  //     .. then genreSong added to list 
  //     .. via func -> addSongToList at component -> pop-up-lists
  const [showLists, setShowLists] = useState(false) 
  const [genreSong, setGenreSong] = useState([''])  
  const addToListIconClicked = async(e) => {
    setGenreSong(e.target.id)
    setShowLists(clicked => !clicked)
  }  


  // ### middleware func -> handleViewList is called
  //     .. onClick upon component -> ProfileLists on page -> Profile
  //     .. to set viewList = id of clicked list to be viewed 
  //     .. then viewList used on func -> findList at page -> PersonalList
  const [viewList, setViewList] = useState()
  const handleViewList = async(e) => {
    setViewList(e.target.id)
  }  
  // ### when user goes from 
  //     .. page -> PersonalList to page -> Profile
  //     .. to view another list setting viewList = undefined
  //     .. makes the loading of another list faster
  useEffect(()=> {
    const location = window.location.href
    const reset = async() => {
      try {
        if(location === 'http://localhost:3000/profile'){
         setViewList(undefined)
        }         
      } catch (error) {
        console.log(error)
      }
    }
    reset()

  })

  // ### when pup-up-list shown || setShowLists == true
  //     .. && user navigates to different page
  //     .. func -> hidePopUpList hides pup-up-list 
  //     .. onClick upon LeftNav || TopNav
  const hidePopUpList = async() => {
    setShowLists(false)
  }




  return (
    <UserContext.Provider 
      value = {
        {
          user: [{user}, setUser], 
          genre: [clickedGenre, setGenre],
          list: [showLists, setShowLists],
          genreSong: [genreSong, setGenreSong],
          genreSongs: [genreSongs, setGenreSongs],
          addListIcon: [addToListIconClicked],
          handleGenre: handleClickedGenre,
          genreImg: genreImg,
          hidePopUpList: hidePopUpList,
          viewList: [viewList],
          handleViewList: handleViewList,
        }
      }>
      <div className="App">
        <TopNav user = {user} hidePopUpList = {hidePopUpList} />
        <LeftNav user = {user} setShowLists = {setShowLists} />
        <Routes>
          <Route exact path='/login'  element={<Login user = {user}/>} />
          <Route path='/'  element={<Home hidePopUpList = {hidePopUpList} />} />
          <Route path='/profile' element={<Profile user ={user} hidePopUpList = {hidePopUpList} />} />
          <Route path='/list' element={<PersonalList user = {user} viewList = {viewList} setViewList = {setViewList} />}/>
          <Route path='/library' element={<Library hidePopUpList = {hidePopUpList}/>} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
