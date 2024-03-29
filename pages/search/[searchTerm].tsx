
import React, { useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useAuthStore from '../../store/authStore';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';
import UserCard from '../../components/UserCard';

const Search = ({ videos }: { videos: Video[] }) => {
    const [isAccounts, setIsAccounts] = useState(false)

    const { query: { searchTerm } } = useRouter();

    const { allUsers } = useAuthStore();

    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const posts = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';

    const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes((searchTerm as string).toLowerCase()));

  return (
    <div className='w-full'>
        <div>
            <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
                <p className={`text-xl font-semibold cursor-pointer ${accounts} mt-2`} onClick={() => setIsAccounts(true)}>
                    Accounts
                </p>
                <p className={`text-xl font-semibold cursor-pointer ${posts} mt-2`} onClick={() => setIsAccounts(false)}>
                    Posts
                </p>
            </div>
            {isAccounts
                ? (
                    <div className='md:mt-16'>
                        {searchedAccounts.length > 0
                            ? (searchedAccounts.map((user: IUser, idx: number) => (
                                <Link href={`/profile/${user._id}`}>
                                    <div className='border-b-2 border-gray-200'>
                                        <UserCard user={user} card_size='large' />
                                    </div>
                                </Link>
                            )))
                            : <NoResults text={`No Account Results for ${searchTerm}`} />
                        }
                    </div>
                )
                : (
                    <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
                        {videos.length
                            ? (videos.map((video: Video, index) => (
                                <VideoCard post={video} key={index} />
                            )))
                            : <NoResults text={`No video results for ${searchTerm}`} />
                        }
                    </div>
                )
            }
        </div>

    </div>
  )
}

export const getServerSideProps = async ({ params: { searchTerm } }: { params: { searchTerm: string } }) => {
    const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

    return {
        props: {
            videos: data
        }
    }
}


export default Search