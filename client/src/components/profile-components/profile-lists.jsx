import './profile-lists.css'
import React,{useState} from 'react'
import {NavLink} from 'react-router-dom'
import { UserContext } from '../../App'
import {MdOutlineDeleteOutline} from 'react-icons/md'

// ### Component ProfileLists is located at...
//     .. ../src/components/profile-components/profile-lists.jsx

// ### displayed only on...
//     .. Profile page at ../src/pages/profile.jsx || route = '/profile' 

// ### param {listImgDef} is passed from ..
//     .. Profile page at ../src/pages/profiles.jsx || route = '/profile
export default function ProfileLists({listImgDef}){

    //params are originated in App.js at /src/App.js 
    const {user: [{user}], addListIcon: [addToListIconClicked],handleViewList} = React.useContext(UserContext)

    // ### middleware handleDeleteListID sets ..
    //     .. deleteListID = id of list requested to be deleted
    //     .. then listIDSet = true validating that list id is set
    //     .. onClick of delete-list icon || MdOutlineDeleteOutline
    //     .. when list id is set className='pop-up-delete' banner is shown
    const [listIDSet, setListIDSet] = useState(false)
    const [deleteListID, setDeleteListID] = useState('')    
    const handleDeleteListID = async(e) => {
        setDeleteListID(e.target.id)
        setListIDSet(clicked => !clicked)
    }

    // ### if listIDSet = true && className='pop-up-delete' banner displayed..
    //     .. func deleteList is called onClick of button with className='delete-button'
    //     .. || className='pop-up-delete' banner is hidden onClick of button with className='cancel-delete-button'
    const deleteList = async() => {
        await fetch(`http://localhost:4000/users/${userID}/user/lists/delete/${deleteListID}/list`,
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
        })
        setListIDSet(false)
    }
    
    if(user !== undefined){
        var userLists = user.Lists
        var userID = user._id
    }
    if (userLists !== undefined){
        var listsLength = userLists.length
    }

    return(
        <div className='profile-lists-container'>
            {listsLength < 1 &&
            <div>
                
                <h1> YOU DO NOT HAVE ANY LISTS YET !</h1>
                <button onClick={addToListIconClicked}>Create a list</button>
            </div>
            }
            {listsLength > 0 &&
            <div className='personal-lists-container'>
                
                {userLists.map((userList)  => 
               
                    <div key = {userList._id} onClick = {handleViewList} id = {userList._id} className='personal-list'>
                        <NavLink to='/list' key={userList._id}>
                        <div className='list-img-container'>
                            {userList.Songs[0] ? 
                                (
                                <img className="list-img" alt = "unavailable" onClick = {handleViewList} id = {userList._id} src = {userList.Songs[0].SongImg} />
                                )
                                :
                                (
                                <img className="list-img" alt = "unavailable" onClick = {handleViewList} id = {userList._id} src = {listImgDef} />
                                )
                            }
                        </div>
                        </NavLink>
                        <div className='list-text-container'>  
                            <div className='list-name-container'>
                                <h3 className='list-name'>
                                    {userList.ListName}
                                </h3>  
                            </div>        
                            <MdOutlineDeleteOutline onClick = {handleDeleteListID}  id = {userList._id} className='delete-list'/>                         
                        </div>

                    </div>
                )}               
               
            </div>   
            }
            {listIDSet === true &&
                <div className='delete-list-popup'>
                    <p className='delete-list-popup-text'> <b>Are you sure to delete this list?</b></p>
                    <button className='delete-list-popup-button' onClick ={deleteList}>Delete</button>
                    <button className='cancel-delete-list-popup-button' onClick = {setListIDSet}>Cancel</button>
                </div>
            }
            
        </div>
    )
}