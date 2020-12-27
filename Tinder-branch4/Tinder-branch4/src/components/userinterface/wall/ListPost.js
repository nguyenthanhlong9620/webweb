import React from 'react'
import PostCard from './PostCard'
import './ListPost'


function ListPost({dbPost,name,img, activeChange}) {
    return (
        <div className='listpost'>
            {dbPost.map((db) => (
                <PostCard db ={db} name={name} img={img} activeChange={activeChange}/>
            ))}
        </div>
    )
}

export default ListPost
