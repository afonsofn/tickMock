
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';
import UserCard from '../../components/UserCard';

interface IProps {
    data: {
      user: IUser;
      userPosts: Video[];
      userLikedPosts: Video[];
    };
  }

const Profile = ({ data: { user, userPosts, userLikedPosts } }: IProps) => {
    const [showUserPosts, setShowUserPosts] = useState(true)
    const [postsList, setPostsList] = useState<Video[]>([])

    const posts = showUserPosts ? 'border-b-2 border-black' : 'text-gray-400';
    const likes = !showUserPosts ? 'border-b-2 border-black' : 'text-gray-400';

    useEffect(() => {
      if(showUserPosts) {
        setPostsList(userPosts)
      } else {
        setPostsList(userLikedPosts)
      }
    }, [showUserPosts, userLikedPosts, userPosts])
    

  return (
    <div className='w-full'>
      <UserCard user={user} card_size='x-large' />

      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
          <p className={`text-xl font-semibold cursor-pointer ${posts} mt-2`} onClick={() => setShowUserPosts(true)}>
            Posts
          </p>
          <p className={`text-xl font-semibold cursor-pointer ${likes} mt-2`} onClick={() => setShowUserPosts(false)}>
            Liked
          </p>
        </div>
        <div className='flex gap-6 flex-wrap md:justify-start'>
          {postsList.length > 0 ? (
            postsList.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserPosts ? '' : 'Liked'} Posts Yet`}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
    const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`);

    return {
        props: {
            data
        }
    }
}

export default Profile