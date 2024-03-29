import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import useAuthStore from '../store/authStore'

import Logo from '../utils/TickMock-dark.png'
import { createOrGetUser } from '../utils'
import { IUser } from '../types';

const Navbar = () => {
    const { userProfile, addUser, removeUser, isLoggedIn } = useAuthStore()
    const [searchValue, setSearchValue] = useState('')
    
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()

        if (searchValue) {
            router.push(`/search/${searchValue}`)
        }
    }

    return (
        <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
            <Link href="/">
                <div className='w-[100px] w-[140px] md:w-[190px] lg:w-[230px]'>
                    <Image
                        className='cursor-pointer'
                        src={Logo}
                        alt='TikTik'
                        layout='responsive'
                    />
                </div>
            </Link>
            <div className='relative hidden md:block'>
                <form
                    onSubmit={handleSearch}
                    className='absolute md:static top-10 left-20 bg-white'
                >
                    <input
                        type="text"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        placeholder='Search accounts and videos...'
                        className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0'
                    />
                    <button
                        onClick={handleSearch}
                        className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
                    >
                        <BiSearch />
                    </button>
                </form>
            </div>
            <div>
                {isLoggedIn
                    ? (
                        <div className='flex gap-5 md:gap-10'>
                            <Link href={'/upload'}>
                                <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                                    <IoMdAdd className='text-xl' /> {` `}
                                    <span className='hidden md:block'>Upload</span>
                                </button>
                            </Link>
                            {(userProfile as IUser).image && (
                                <Link href={'/'}>
                                    <>
                                    <Image 
                                        width={40}
                                        height={40}
                                        className='rounded-full cursor-pointer'
                                        src={(userProfile as IUser).image}
                                        alt='profile Photo'
                                    />
                                    </>
                                </Link>
                            )}
                            <button
                                type='button'
                                className='pr-2'
                                onClick={() => {
                                    googleLogout()
                                    removeUser()
                                    router.push('/')
                                }}
                            >
                                <AiOutlineLogout color='red' fontSize={28} />  
                            </button>
                        </div>
                    )
                    : (
                        <GoogleLogin
                            onSuccess={(response) => createOrGetUser(response, addUser)}
                            onError={() => console.log('error')}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Navbar