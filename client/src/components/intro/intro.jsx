import './intro.css'


// ### Component Intro is located at...
//     .. ../src/components/intro/intro.jsx

// ### displayed on...
//     .. Library page at ../src/pages/library.jsx || route '/library'
//     .. Profile page at  ../src/pages/profile.jsx || route = '/profile'
//     .. PersonalList page at ../src/pages/personal-list.jsx || route = '/list'


// ### params {description, background, title, src, introImgDef }
//     .. are passed from ..
//     .. Library page at ../src/pages/library.jsx || route '/library'
//     .. Profile page at ../src/pages/profiles.jsx || route = '/profile
//     .. PersonalList page at ../src/pages/personal-list.jsx || route = '/list'
export default function Intro({description, background, title, src, introImgDef }) {

    return(
        <div style={background} className="intro-container">
            {src ?(
                <img alt = "unavailable" className="intro-img" src = {`${src}`} />
            )
            :
            (
                <img alt = "unavailable" className="intro-img" src = {`${introImgDef}`} />
            )

            }
            
            <div className="intro-text-container">
                <h4 className="intro-description">{description}</h4>
                {title ? (
                    <h1 className="intro-title">{title.toUpperCase()}</h1>
                )
                :(
                    <h1 className="intro-title">Alternative</h1>
                )
                }
                
            </div>
        </div>
    )
}