import './topnav-button.css'

export default function TopNavButton({text, className}){
    const logout = () =>{
        if(text === 'LOG OUT'){
            fetch('http://localhost:4000/logout', {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            })  
            window.location = '/'            
        }

    }
    return(
        <div className='TopNavButton'>       
            <button onClick={logout} className={`${className}`}>
                <h3>{text}</h3>
            </button>      
        </div>
    )
}