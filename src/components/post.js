import React, {useState} from 'react';
import './post.css'
import userAvatar from "../assets/userAvatar";
import {useNavigate} from "react-router-dom";
import {getPostComments} from "../api";
import {Spinner} from "react-bootstrap";

const Post = (props) => {
    const {userId,title,body,id} = props.post
    const navigate = useNavigate()
    const useComments = () => {
        const delay = () => new Promise(resolve => setTimeout(resolve,500))
        const [commentsActive, setCommentsActive] = useState(false)
        const [isLoading, setIsLoading] = useState(false)
        const [comments, setComments] = useState([])
        const onClickHandler = async () => {
            if (commentsActive) {
                setCommentsActive(prevState => !prevState)
            } else {
                setCommentsActive(prevState => !prevState)
                setIsLoading(true)
                await delay()
                setComments(await getPostComments(id).then(data=>data))
                setIsLoading(false)
            }
        }
        const commentsElement = () => (
                <>
                    {commentsActive ? <div>
                        {isLoading ? <Spinner style={{color: 'white'}} animation='border'/> : comments.map(({email,body,id})=><div key={id}>
                            <div style={{marginBottom: '5px'}}>{email}</div>
                            <div style={{borderBottom: '1px solid white'}}>{body}</div>
                        </div>)}
                    </div> : null}
                </>
            )
        return [commentsElement,onClickHandler]
    }
    const [comments,onClickHandler] = useComments()

    return (
        <div className='post'>
            <div className='post-header' onClick={()=>navigate(`/user/${userId}`)}>
                <div className='post-header-avatar'>
                    {userAvatar()}
                </div>
                {title}
            </div>
            {body}
            <div className='post-footer'>
                <div onClick={onClickHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg>
                </div>
                {comments()}
            </div>
        </div>
    );
};

export default Post;