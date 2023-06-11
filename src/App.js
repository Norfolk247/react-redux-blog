import {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {pages} from "./pages";
import Main from "./pages/main";

import Burger from "./components/burger";

import userAvatar from "./assets/userAvatar";

import './App.css'

function App() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch({type: 'fetchPosts'})
    },[])
    const navigate = useNavigate()

    return (
        <div>
            <header>
                <Burger>
                    <div className='burgerHeader'>
                        <div className='burgerHeader-item'>{userAvatar()}</div>
                        <div className='burgerHeader-item'>Георгий george.popov.2000@gmail.com</div>
                    </div>
                    <div className='burgerNav'>
                        {pages.filter(({shouldBeInHeader})=>shouldBeInHeader).map(({path,name})=><p key={path} onClick={()=>navigate(path)}>{name}</p>)}
                    </div>
                </Burger>
            </header>
            <Routes>
                {pages.map(({path,element})=><Route key={path} path={path} element={element}/>)}
                <Route path='*' element={<Main/>}/>
            </Routes>
        </div>
    );
}

export default App;