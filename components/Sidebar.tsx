import React, { useState } from 'react'
import Link from 'next/link'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'

import Discover from './Discover'
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'
import { useRouter } from 'next/router'

const Sidebar = () => {
    const [showSideBar, setshowSideBar] = useState(true)

    const router = useRouter()

    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded'

    if(router.route === '/upload') return null

    return (
        <div>
            <div
                className="block xl:hidden m-2 ml-4 mt-3 text-xl"
                onClick={() => setshowSideBar((prev) => !prev)}
            >
                { showSideBar ? <ImCancelCircle /> : <AiOutlineMenu /> }
            </div>
            { showSideBar && (
                <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
                    <div className='xl:border-b-2 border-gray-200 xl:pb-4'> {/*  HOME BUTTON */}
                        <Link href='/'>
                            <div className={normalLink}>
                                <p className="text-2xl">
                                    <AiFillHome />
                                </p>
                                <span className='text-lg hidden xl:block'>For You</span>
                            </div>
                        </Link>
                    </div>
                    <Discover />
                    <SuggestedAccounts />
                    <Footer />
                </div>
            ) }
        </div>
    )
}

export default Sidebar