import Image from 'next/image'
import React from 'react'
import { GoVerified } from 'react-icons/go';
import { IUser } from '../types';

interface IProps {
    user: IUser;
    card_size: string;
}

const UserCard = ({ user, card_size }: IProps) => {
    const cardSize: any = () => {
        const sizes: any = {
            'small': ['gap-3 cursor-pointer', 'w-8 h-8', 34, '', 'text-sm', 'hidden xl:block'],
            'medium': ['gap-3 p-2 cursor-pointer', 'md:w-16 md:h-16 w-10 h-10', 62, '', '', 'hidden xl:block'],
            'large': ['gap-3 p-2 cursor-pointer', 'ml-4 md:w-20 md:h-20 w-16 h-16', 62, 'md:text-xl', 'text-sm', 'md:text-sm'],
            'x-large': ['gap-6 md:gap-10 mb-4 w-full', 'w-16 h-16 md:w-32 md:h-32', 120, 'md:text-2xl', 'md:text-xl text-md', 'md:text-xl']
        }
        
        return sizes[card_size]
    }
    
    return (
        <div className={`flex items-center font-semibold ${cardSize()[0]}`}>
            <div className={cardSize()[1]}>
                <Image
                    width={cardSize()[2]}
                    height={cardSize()[2]}
                    layout='responsive'
                    className='rounded-full'
                    src={user.image}
                    alt='user-profile'
                />
            </div>

            <div className='flex flex-col '>
                <p className={`flex gap-1 items-center text-md font-bold text-primary justify-center tracking-winder ${cardSize()[3]}`}>
                    {user.userName.replaceAll(' ', '').toLowerCase()}
                    <GoVerified className={`text-blue-400 ${cardSize()[4]}`} />
                </p>
                <p className={`capitalize text-gray-400 text-xs ${cardSize()[5]}`}>{user.userName}</p>
            </div>
        </div>
    )
}

export default UserCard