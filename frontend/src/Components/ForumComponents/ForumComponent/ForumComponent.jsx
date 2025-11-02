import React from 'react'
import PostComponent from '../PostComponent/PostComponent'
import PostFilterComponent from '../PostFilterComponent/PostFilterComponent'
import PostListComponent from '../PostListComponent/PostListComponent'
import './ForumComponent.css'

const ForumComponent = () => {
  return (
    <div className='forum-component'>
      <div className="forum-component-top">
        <PostComponent/>
      </div>
      <div className="forum-component-bottom">
          <PostFilterComponent/>
          <PostListComponent/>
      </div>    
    </div>
  )
}

export default ForumComponent