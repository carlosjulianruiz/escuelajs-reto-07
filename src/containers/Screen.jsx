import React from 'react'
import Products from '../components/Products'
import Checkout from '../containers/Checkout'
import '../styles/containers/screen.styl';



const screen = ()=>{
    return (
        <div className='screenMain'>
            <div className='productsBox'>
                <Products/>
            </div>
            <div className='summaryBox'>
                <Checkout/>
            </div>
                 
        </div>
        
    )
}


export default screen