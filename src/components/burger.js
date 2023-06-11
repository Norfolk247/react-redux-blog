import React, {useState} from "react";
import './burger.css'

const Burger = ({children}) => {
    const [burgerActive, setBurgerActive] = useState(false)
    return (
        <>
            <svg onClick={()=>setBurgerActive(prevState => !prevState)} xmlns="http://www.w3.org/2000/svg" width='40' height='40' fill="currentColor" className="bi bi-list" viewBox="0 0 16 16" color='white'>
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
            <div onClick={()=>setBurgerActive(prevState => !prevState)} className={burgerActive ? 'burger-placeholder active' : 'burger-placeholder'}></div>
            <div className={burgerActive ? 'burger-menu active' : 'burger-menu'}>{children}</div>
        </>
    )
}

export default Burger