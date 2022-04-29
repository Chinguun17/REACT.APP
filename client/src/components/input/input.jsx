import './input.css'

export default function Input ({ type, placeholder, onChange }){

    return (
        <div className='input-container'>
             <input type={type} placeholder={placeholder} onChange={onChange} required/>
        </div>
    )
}