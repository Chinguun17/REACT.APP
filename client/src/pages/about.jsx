import './about.css'
import React from "react"
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
export default function About(){

    return(
      <div className='About'>
        <div className='about-container'>
          <h4 className='title'>Developed by</h4>
          <h1 className='name'>Chinguun</h1>
          <marquee width="25%" direction="left" scrollamount='5' height="100px">
            Let's work together...<span className='span'> Feel free to contact! :))</span>
          </marquee>
        </div>

        <Carousel showThumbs={false} className='carousel'>
  
          <div className="box">
            <p className='sub-title'>Check out my:</p>
            <a rel="noreferrer" href = 'https://codepen.io/Miles0417/full/rNGRdEy' target='_blank'>
              <button className='main-text-button'>                  
                <h1 className='main-text' >portfolio</h1>                                    
              </button>
            </a>  
          </div>

          <div className="box">
            <p className='sub-title'>Contact info:</p>            
            <div className='contact-text-container'>
              <ul>
                <li className='contact-text'>E-mail: chinguunbaatar17@gmail.com</li>
                <li className='contact-text'>Phone-number: +(886)-970003015</li>
                <li className='contact-text'>Location: Tainan, TW</li>                      
              </ul>          
            </div>
          </div>
        </Carousel>                

      </div>
    )
}


