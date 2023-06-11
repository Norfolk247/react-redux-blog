import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getUser} from "../api";

const User = () => {
    const {id} = useParams()
    useEffect(()=>{
        getUser(id).then(console.log)
    },[])
    return (
        <div>

        </div>
    );
};

export default User;