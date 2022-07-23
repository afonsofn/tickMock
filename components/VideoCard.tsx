import React, { useState, useRef } from 'react'
import { NextPage } from 'next';
import { Video } from '../types';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={'/'}>
              <>
                <Image 
                  width={62}
                  height={62}
                  className='rounded-full'
                  src={post.postedBy.urlImage}
                  alt='profile Photo'
                  layout='responsive'
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={'/'}>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {post.postedBy.userName} {` `}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className='lg:ml-20 flex gap-4 relative'>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={'/'}>
            <video
              loop
              ref={videoRef}
              src={post.video.asset.url}
              className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer rounded-3xl bg-gray-100'
            >
            </video>
          </Link>
          {isHover && (
            <div className='absolute cursor-pointer flex p-5 justify-between bottom-1 w-[200px] lg:w-[600px]'>
              {playing 
                ? (
                  <button>
                    <BsFillPauseFill
                      onClick={onVideoPress}
                      className='text-black text-2xl lg:text-4xl'
                    />
                  </button>
                )
                : (
                  <button>
                    <BsFillPlayFill
                      onClick={onVideoPress}
                      className='text-black text-2xl lg:text-4xl'
                    />
                  </button>
                )
              }
              {isVideoMuted 
                ? (
                  <button>
                    <HiVolumeOff
                      onClick={() => setIsVideoMuted(false)}
                      className='text-black text-2xl lg:text-4xl'
                    />
                  </button>
                )
                : (
                  <button>
                    <HiVolumeUp
                      onClick={() => setIsVideoMuted(true)}
                      className='text-black text-2xl lg:text-4xl'
                    />
                  </button>
                )
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard