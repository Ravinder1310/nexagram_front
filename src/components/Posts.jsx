import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

const Posts = () => {
  const {posts} = useSelector(store=>store.post);
  return (
    <div className='pb-20'>
    {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
    ) : (
      <div className=' mt-56 font-bold text-4xl text-center'>
        😥
        <p className="text-center text-gray-500">No posts yet</p>
        </div>
    )}
</div>
  )
}

export default Posts