import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import avatar from "./images/avatar.png";

const Comment = ({ comment }) => {
    return (
        <div className='my-2'>
            <div className='flex gap-3 items-center'>
                <Avatar className='w-8 h-8'>
                    <AvatarImage src={comment?.author?.profilePicture} />
                    <AvatarFallback src={avatar} />
                </Avatar>
                <h1 className='font-bold text-sm'>{comment?.author.username} <span className='font-normal pl-1'>{comment?.text}</span></h1>
            </div>
        </div>
    )
}

export default Comment