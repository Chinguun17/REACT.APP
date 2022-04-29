import './bigButton.css'

export default function BigButton ({text, type}){

    return (
        <div className='buttonContainer'>
            <button type={type}>
                {text}
            </button>
        </div>
    )
}