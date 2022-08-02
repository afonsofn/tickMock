import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';
import useAuthStore from '../store/authStore';
import { BASE_URL, formatDoc } from '../utils';
import { client } from '../utils/client';
import { topics } from '../utils/constants';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { IUser } from '../types';

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>()
    const [wrongFileType, setWrongFileType] = useState(false)
    const [uploadError, setUploadError] = useState(false)
    const [caption, setCaption] = useState('')
    const [topic, setTopic] = useState(topics[0].name)
    const [savingPost, setSavingPost] = useState(false)

    const { userProfile }: { userProfile: IUser } = useAuthStore()

    const router = useRouter()

    const uploadVideo = async (e: any) => {
        e.preventDefault()

        const selectedFile = e.target.files[0]
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']

        if (!fileTypes.includes(selectedFile.type)) setWrongFileType(true)

        try {
            setIsLoading(true)
            setWrongFileType(false)
            setUploadError(false)

            const data = await client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name,
            })

            setVideoAsset(data)
            setIsLoading(false)
        } catch (_error) {
            setUploadError(true)
        }
    }

    const handlePost = async (e: any) => {
        e.preventDefault()
        
        if(caption && topic && videoAsset?._id) {
            setSavingPost(true)

            const doc = formatDoc(caption, topic, videoAsset?._id, userProfile?._id)

            await axios.post(`${BASE_URL}/api/post`, doc)

            router.push('/')
        }
    }

    const handleDiscard = () => {}

  return (
    <div className='flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 md:pt-5 bg-[#F8F8F8] justify-center'>
        <div className='bg-white rounded-lg 2xl:h-[85vh] w-[74vw] flex flex-row gap-6 flex-wrap justify-center 2xl:items-center p-8'>
            <div className='w-full min-w-[330px] max-w-[530px] h-[600px] md:h-[400px] lg:h-[528px] flex flex-col'>
                <div>
                    <p className='text-2xl font-bold'>Upload Video</p>
                    <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
                </div>
                
                <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-full h-[640px] md:h-[440px] lg:h-[568px] p-10 cursor-pointer hover:border-red-200 hover:bg-gray-100'>
                    { isLoading
                        ? (<p>Uploading...</p>)
                        : (
                            <div>
                                {videoAsset
                                    ? (
                                        <div>
                                            <video
                                                src={videoAsset.url}
                                                loop
                                                controls
                                                className='w-full rounded-2xl cursor-pointer rounded-3xl'
                                            >
                                            </video>
                                        </div>
                                    )
                                    : (
                                        <label className='cursor-pointer'>
                                            <div className='flex flex-col items-center justify-center h-full'>
                                                <div className='flex flex-col items-center justify-center'>
                                                    <p className='font-bold text-xl'>
                                                        <FaCloudUploadAlt
                                                            className='text-gray-300 text-6xl'
                                                        />
                                                    </p>
                                                    <p className='text-md font-semibold'>
                                                        Upload Video
                                                    </p>
                                                </div>
                                                <p className='text-gray-400 text-center mt-10 text-sm leading-8'>
                                                    MP4 or WebM or ogg <br />
                                                    720x1280 or higher <br />
                                                    Up to 10 minutes <br />
                                                    Less than 2GB <br />
                                                </p>
                                                <p className='bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                                                    Select File
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                name="upload-video"
                                                className='w-0 h-0'
                                                onChange={uploadVideo}
                                            />
                                        </label>
                                    )
                                }
                            </div>
                        )
                    }
                    { wrongFileType && (
                        <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>
                            Please select a valid video
                        </p>
                    )}
                    { uploadError && (
                        <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>
                            Opss, something went wrong, try again :D
                        </p>
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-3 md:pt-10 pb-10 w-full min-w-[330px] max-w-[530px]'>
                <label className='text-md font-medium '>Caption</label>
                <input
                    type='text'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className='rounded outline-none text-md border-2 border-gray-200 p-2'
                />
                <label className='text-md font-medium '>Choose a topic</label>

                <select
                    onChange={(e) => setTopic(e.target.value)}
                    className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
                >
                    {topics.map((topic) => (
                    <option
                        key={topic.name}
                        className=' outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                        value={topic.name}
                    >
                        {topic.name}
                    </option>
                    ))}
                </select>
                <div className='flex gap-6 mt-10'>
                    <button
                        onClick={handleDiscard}
                        type='button'
                        className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                    >
                        Discard
                    </button>
                    <button
                        disabled={videoAsset?.url ? false : true}
                        onClick={handlePost}
                        type='button'
                        className='bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                    >
                        {savingPost ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Upload