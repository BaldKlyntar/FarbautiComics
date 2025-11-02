import React, { useState, useEffect} from 'react'
import './PostListComponent.css'
import { CgProfile } from "react-icons/cg";
import { GiMagicAxe } from "react-icons/gi";
import { GiBrokenAxe } from "react-icons/gi";
import { GiRuneStone } from "react-icons/gi";
import customFetch from '../../../Utils/customFetch';
import { useActionData} from 'react-router-dom';


const PostListComponent = () => {

    const actionData = useActionData();



    const [all_posts, setAll_Posts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

        //Todos los posts

          const fetchAllPosts = async () => {
            try {
              setIsLoading(true);
              const { data } = await customFetch.get('/post/allposts');
              setAll_Posts(data.posts);
            } catch (error) {
                console.log(error)
            } finally {
              setIsLoading(false); 
            }
          };
      
        useEffect(() => {
          fetchAllPosts();
        }, []);

            useEffect(() => {
        if (actionData?.reload){
            fetchAllPosts();
        }
    }, [actionData])

        

  return (
    <div className="post-list-component-background">
        {all_posts.map((post) => {
            return<><div  className="post-list-item" >
            <div className="post-item-header">
                <h1>{post.title}</h1>
                <div className="post-item-author">
                    <CgProfile size={25}/>
                    <h4>{post.author}</h4>
                </div>
            </div>
            <div className="post-item-content">
                <p>{post.content}</p>
            </div>
            <div className="post-item-specs">
                <h4>{post.postDate}</h4>
                <div className="post-item-feedback">
                    <div className="post-item-feedback-container">
                        <GiMagicAxe size={25}/>
                        <h4>{post.votes}</h4>
                        <GiBrokenAxe size={25}/>
                        <h4>{post.downvotes}</h4>
                    </div>
                    <div className="post-item-feedback-container">
                        <GiRuneStone size={25}/>
                        <h4>{post.comments.length}</h4>
                    </div>
                </div>
            </div>
        </div></>
        })}
 
    </div>
  )
}

export default PostListComponent