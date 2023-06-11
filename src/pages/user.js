import './user.css'
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getUser, getUserPosts} from "../api";
import {Card, Spinner} from "react-bootstrap";
import userAvatar from "../assets/userAvatar";
import Post from "../components/post";

const User = () => {
    const {id} = useParams()
    const [user,setUser] = useState({})
    const [posts,setPosts] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()

    const delay = () => new Promise(resolve => setTimeout(resolve,500))
    const goBackButtonHandler = () => {
        navigate('/')
    }

    useEffect(()=>{
        const loadUser = async () => {
            setIsLoading(true)
            getUserPosts(id).then(data=>setPosts(data))
            getUser(id).then(data=>setUser(data))
            await delay()
            setIsLoading(false)
        }
        loadUser()
    },[])

    if (user.error) {
        return (
            <h1>{user.error}</h1>
        )
    }
    if (isLoading) {
        return (
            <div className='main'>
                <Spinner style={{color: 'white', padding: '20px', margin: '30px'}} animation='border'/>
            </div>
        )
    }

    return (
        <div className='main'>
            <div className='goBackButton' onClick={goBackButtonHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
                </svg>
            </div>
            <Card className='user-card'>
                <Card.Header>{userAvatar()}</Card.Header>
                <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Subtitle>{user.email}</Card.Subtitle>
                    <Card.Text>{user.name}</Card.Text>
                    <Card.Text>{user.phone}</Card.Text>
                    <Card.Text>{user.website}</Card.Text>
                </Card.Body>
            </Card>
            {posts.map(post=><Post key={post.id} post={post}/>)}
        </div>
    );
};

export default User;