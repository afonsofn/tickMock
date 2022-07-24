import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import NoResults from './NoResults';
import { IUser } from '../types';

interface IComment {
  comment: string;
  length?: number;
  _key?: string;
  postedBy?: IUser;
}

interface IProps {
  comments: IComment[];
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  isPostingComment: boolean;
}

const Comments = ({ comments, comment, setComment, addComment, isPostingComment }: IProps) => {
  const { userProfile } = useAuthStore();

  return (
    <>
      <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]'>
        <div className='overflow-scoll lg:h-[475px]'>
          {comments?.length 
            ? (
              <div>videos</div>
            )
            : (
              <NoResults text='No comments yet' />
            )
          }
        </div>
      </div>
      {userProfile && (
        <div className='pt-6 px-2 md:px-10'>
          <form onSubmit={addComment} className="flex gap-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className='bg-primary px-6 py-4 text-md font-medium border-2 w-full border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            />
            <button
              className='text-md text-gray-400 '
              onClick={addComment}
            > 
              {isPostingComment
                ? 'Commenting...'
                : 'Comment'
              }
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Comments