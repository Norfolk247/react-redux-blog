import './main.css'
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import Post from "../components/post";
import {CloseButton, Spinner, Pagination} from 'react-bootstrap'

const Main = () => {
    const useFilteredPosts = () => {
        const posts = useSelector(state => state.post.posts)
        const filterInput = useRef()
        const [filteredPosts,setFilteredPosts] = useState(posts)
        const [sortTrigger, setSortTrigger] = useState(0)

        const sortPosts = (posts) => {
            switch (sortTrigger) {
                case 0:
                    return posts.toSorted(function (a,b) {
                        if (a.id>b.id) return 1
                        return -1
                    })
                case 1:
                    return posts.toSorted(function (a,b) {
                        if (a.title.toLowerCase()>b.title.toLowerCase()) return 1
                        return -1
                    })
                case 2:
                    return posts.toSorted(function (a,b) {
                        if (a.title.toLowerCase()<b.title.toLowerCase()) return 1
                        return -1
                    })
                default:
                    return posts
            }
        }
        const filterPosts = (filter) => {
            setFilteredPosts(sortPosts(posts.filter(({title}) => title.toLowerCase().includes(filter.toLowerCase()))))
        }

        useEffect(()=>{
            filterPosts(filterInput.current.value)
        },[posts, filterInput,sortTrigger])
        const clearFilterOnClickHandler = () => {
            filterInput.current.value = ''
            setFilteredPosts(posts)
        }

        return [filteredPosts,filterInput,filterPosts,clearFilterOnClickHandler,setSortTrigger]
    }
    const postsToPagination = (posts,elementsPerPage,page=1) => {
        return [posts.slice(elementsPerPage*(page-1),elementsPerPage*page),Math.ceil(posts.length/elementsPerPage)]
    }

    const [currentPage,setCurrentPage] = useState(1)
    const [filteredAndSortedPosts,filterInput,filterPosts,clearFilterOnClickHandler,setSortTrigger] = useFilteredPosts()
    const loading = useSelector(state => state.post.isLoading)

    const [slicedPosts,maxPages] = postsToPagination(filteredAndSortedPosts,3,currentPage)
    const filteredAndSortedPostsElement = () => (<>
        {loading ? <Spinner style={{color: 'white', padding: '20px', margin: '30px'}} animation='border'/> : slicedPosts.map(post=><Post key={post.id} post={post}/>)}
    </>)

    return (
        <div className='main'>
            <div className='filter'>
                <input ref={filterInput} onChange={e=>filterPosts(e.target.value)} placeholder='Поиск...'/>
                <CloseButton onClick={clearFilterOnClickHandler}/>
            </div>
            <div className='sorter' onClick={()=>setSortTrigger(prev=>(prev+1)%3)}>Сортировать по заголовку</div>
            {filteredAndSortedPostsElement()}
            <Pagination style={{position:'fixed',bottom: 0}}>
                <Pagination.First onClick={()=>setCurrentPage(1)}/>
                <Pagination.Prev onClick={()=>setCurrentPage(prev=>prev>1 ? prev-1 : prev)}/>
                <Pagination.Item active>{currentPage}</Pagination.Item>
                <Pagination.Next onClick={()=>setCurrentPage(prev=>prev<maxPages ? prev+1 : prev)}/>
                <Pagination.Last onClick={()=>setCurrentPage(maxPages)}/>
            </Pagination>
        </div>
    );
};

export default Main;