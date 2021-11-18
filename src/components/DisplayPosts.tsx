
import React, { useState } from 'react';
import CopyToClipboard from "react-copy-to-clipboard";

/* Create interface for data's type*/

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
        
        
        const [posts, setPosts] = useState<Post[]>([]);
        const [comments, setComments] =useState<Comment[]>([]);

/* Sort by id's and most commented */
        const [sortId, setSortId] = useState(true);
        const [sortComment, setSortComment] = useState(true);
        

/* fetch data's */

        fetch('https://jsonplaceholder.typicode.com/posts/')
        .then(response => response.json())
        .then(res => {  
            setPosts(res)
        } );
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(res => {  
            setComments(res)
        } );

        const handleSortById = () => {
            setSortId(!sortId);
            console.log(sortId)
        }
        const handleSortByMostCommented = () => {
            setSortComment(!sortComment);
        }

    
    return (
        <div className="display-posts">
            <div className="container-button">
                <button onClick={handleSortById}>Sort by id's</button>
                <button onClick={handleSortByMostCommented}>Sort by most commented</button>
            </div>
            <ul className="collection">
                        {posts.sort(sortId?(a, b) => a.id - b.id:(a, b) => b.id - a.id).map(post =>
                            (
                                <div>
                                    <div
                                        key={post.id}
                                        className="posts-container"
                                    >
                                        <h2>{post.title}</h2>
                                        <div className="dropdown">
                                            <span>Post Menu</span>
                                            <div className="dropdown-content">
                                        <CopyToClipboard text={`${post.id}`}>
                                         <p onClick={() => {
                                            post.id?alert(`Id: ${post.id} copy to clipboard`):alert("No ID for this post!");
                                         }}>post id: {post.id}</p>  
                                         </CopyToClipboard>
                                            <p onClick={() => {
                                                fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
                                                    method: 'DELETE',
                                                  });
                                                alert("Post deleted !")
                                            }}>Delete post</p>
                                            </div>
                                        </div>
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