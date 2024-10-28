import React, { useEffect } from 'react';
import Post from './Post';
import { useSelector } from 'react-redux';

const Posts = () => {
  const { posts, isFollowingUser } = useSelector(store => store.post);


  // useEffect(() => {
  //   console.log("userdsfdsfd",isFollowingUser);
  // },[posts])

  return (
    <div className='pb-20'>
      {posts?.length > 0 ? (
        posts?.map((post, index) => (
          <Post 
            key={post._id} 
            post={post} 
            isFollowingUsers={isFollowingUser[index]} 
          />
        ))
      ) : (
        <div className='mt-56 font-bold text-4xl text-center'>
          😥
          <p className="text-center text-gray-500">No posts yet</p>
        </div>
      )}
    </div>
  );
}

export default Posts;
