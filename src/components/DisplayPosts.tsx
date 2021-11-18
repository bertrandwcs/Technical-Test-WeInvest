
import React, { useEffect, useState } from 'react';

export interface Post {
        userId:number,
        id: number,
        title: string,
        body:string,
        completed:boolean
    }

    export interface Comment {
        postId:number,
        id: number,
        name: string,
        email:string,
        body:string
    }
    
    
    const DisplayPosts  = () => {
        
        
        const [posts, setPosts] = useState<Post[]>([])
        const [comments, setComments] =useState<Comment[]>([])

    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/')
        .then(response => response.json())
        .then(res => {  
            setPosts(res)
        } )
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(res => {  
            setComments(res)
        } )
    },[])
    
    return (
        <div className="display-posts">

<ul className="collection">
                        {posts.map(post =>
                            (
                                <div>
                                    <div
                                        key={post.id}
                                        className="posts-container"
                                    >
                                        <h2>{post.title}</h2>
                                        <p>{post.body}</p>
                                    </div>
                                    <div >
                                        <ul className="collection">
                                        {
                                            comments.map(comment => {
                                                if (post.id === comment.postId) {

                                                   return (
                                                        <li
                                                            key={comment.id}
                                                            
                                                        >
                                                            <p className="email">{comment.email} </p>
                                                            <p>{comment.body}</p>
                                                        </li>
                                                    )
                                                } else {
                                                    return ""
                                                }
                                            }
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                    </ul>
            
            
        </div>
    );
};

export default DisplayPosts;