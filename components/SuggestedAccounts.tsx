import React, { useEffect } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../store/authStore';

import { IUser } from '../types';
import UserCard from './UserCard';

const SuggestedAccounts = () => {
  const { allUsers } = useAuthStore();

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>Suggested Accont</p>

      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer rounded'>
              <UserCard user={user} card_size='small' />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts