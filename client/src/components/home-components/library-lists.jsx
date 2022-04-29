import './personal-lists.css'
import {options, library} from '../../data/data'

export default function LibraryLists({user}){

    return(
        <div className='Library-Lists'>
            <h2>Library</h2>
            <ul tableindex='0' role='listbox' className='lists'>
                {options.map((option) => 
                    <li className='list'
                        key = {option.value}>
                        {option.text}
                    </li>
                )}
            </ul>

        </div>
    )
}