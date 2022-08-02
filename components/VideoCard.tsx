import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import UserCard from './UserCard';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { Video } from '../types';

const VideoCard = ({ post: { postedBy, _id, video } }: { post: Video }) => {
  const [isHover, setIsHover] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress = () => {
    videoRef?.current?.[playing ? 'pause' : 'play']()

    setPlaying(!playing)
  }

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
      
  }, [isVideoMuted])
  

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <Link href={`/profile/${postedBy._id}`}>
        <div>
          <UserCard user={postedBy} card_size='medium' />
        </div>
      </Link>

      <div className='lg:ml-20 mr-10 flex gap-4 relative'>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className='flex items-center justify-center sm:w-[930px]'
        >
          <Link href={`/details/${_id}`}>
              <video
                loop
                ref={videoRef}
                src={video.asset.url}
                className='w-full max-w-[930px] h-[600px] md:h-[400px] lg:h-[528px] rounded-2xl cursor-pointer rounded-3xl bg-gray-100'
              >
              </video>
          </Link>
          {isHover && (
            <div className='absolute w-full max-w-[930px] cursor-pointer flex p-5 justify-between bottom-1'>
              {playing 
                ? (
                  <button>
                    <BsFillPauseFill
                      onClick={onVideoPress}
                      className='text-gray-200 text-2xl lg:text-4xl'
                    />
                  </button>
                )
                : (
                  <button>
                    <BsFillPlayFill
                      onClick={onVideoPress}
                      className='text-gray-200 text-2xl lg:text-4xl'
                    />
                  </button>
                )
              }
              {isVideoMuted 
                ? (
                  <button>
                    <HiVolumeOff
                      onClick={() => setIsVideoMuted(false)}
                      className='text-gray-200 text-2xl lg:text-4xl'
                    />
                  </button>
                )
                : (
                  <button>
                    <HiVolumeUp
                      onClick={() => setIsVideoMuted(true)}
                      className='text-gray-200 text-2xl lg:text-4xl'
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