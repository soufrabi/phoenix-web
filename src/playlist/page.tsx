"use client"
import React from 'react'
import { useSearchParams } from "react-router-dom"
import axios, { AxiosResponse } from "axios"
import { nanoid } from "nanoid"
import { currentInvidiousInstance } from '../data/invidious'


type IndividiousPlaylistResponse = {
    "title": string,
    "playlistId": string,

    "author": string,
    "authorId": string,
    "authorThumbnails": [
        {
            "url": string,
            "width": string,
            "height": string
        }
    ],
    "description": string,
    "descriptionHtml": string,

    "videoCount": number,
    "viewCount": number,
    "updated": number,

    "videos": [
        {
            "title": string,
            "videoId": string,
            "author": string,
            "authorId": string,
            "authorUrl": string,

            "videoThumbnails": [
                {
                    "quality": string,
                    "url": string,
                    "width": number,
                    "height": number
                }
            ],
            "index": number,
            "lengthSeconds": number
        }
    ]
}

export default function PlaylistPage() {
    // const router = useRouter()
    const [searchParams, setSearchParams] = useSearchParams()
    const playlistId: string = React.useMemo(() => (
        searchParams.get("list") || ""
    ), [searchParams])

    const [playlistInfo, setPlaylistInfo] = React.useState<IndividiousPlaylistResponse | null>(null)

    const handleVideoImageClick = (videoId: string) => {
        // router.push(`/watch?v=${videoId}`)
        setSearchParams({
            type: "watch",
            v: videoId,
        })

    }

    const fetchPlaylistInfo = async () => {

        try {
            const res: AxiosResponse = await axios.get(`https://${currentInvidiousInstance}/api/v1/playlists/${playlistId}`)

            const data: IndividiousPlaylistResponse = res.data
            // console.log('Data : ', data)
            setPlaylistInfo(data)

        } catch (err: any) {
            // console.error(err)
            console.error("Could not connect to api server")

        }
    }

    React.useEffect(() => {
        fetchPlaylistInfo()
    }, [])

    React.useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    })

    return (
        <main className="h-full w-screen pt-14">
            <div className='h-full w-full flex flex-row'>
                <div className='md:w-96'>
                </div>

                <div className='h-full w-full grid grid-cols-12'>
                    <div className='flex flex-col gap-2 col-span-3 items-center px-8 py-4 bg-blue-50/80 rounded-2xl'>
                        <img

                            src={playlistInfo?.videos[0].videoThumbnails[0].url}
                            alt={""}
                            // width={16 * 25}
                            // height={9 * 25}
                            onContextMenu={(ev: React.MouseEvent<HTMLImageElement>) => { ev.preventDefault() }}
                        />
                        <div>
                            <span
                                className='text-xl font-semibold'
                            >{playlistInfo?.title}</span>
                        </div>

                        <div className='flex flex-col w-full'>
                            <div >
                                <span
                                >{playlistInfo?.author}</span>
                            </div>
                            <div className=''>
                                <span
                                    className='text-sm text-gray-500'
                                >{playlistInfo?.videoCount} videos - {playlistInfo?.viewCount} views - Last Updated {playlistInfo?.updated}</span>
                            </div>
                        </div>
                        <div className=''>
                            <span
                            >{playlistInfo?.description}</span>

                        </div>

                    </div>
                    <div className='flex flex-col h-[calc(100svh-4rem)] gap-2 pt-2 col-span-9 overflow-y-scroll'>

                        {playlistInfo !== null && playlistInfo.videos.map((video, index) => (
                            <div key={nanoid()} className='flex flex-row gap-2'>
                                <div className='flex items-center pl-2 pr-0'>
                                    <span
                                    >{index + 1}</span>
                                </div>
                                <img
                                    src={video.videoThumbnails[0].url}
                                    alt={""}
                                    width={16 * 20}
                                    height={9 * 20}
                                    onContextMenu={(ev: React.MouseEvent<HTMLImageElement>) => { ev.preventDefault() }}
                                    onClick={() => { handleVideoImageClick(video.videoId) }}
                                />
                                <div className='flex flex-col gap-0'>
                                    <div>
                                        <span
                                            className='font-semibold text-md'
                                        >{video.title}</span>
                                    </div>
                                    <div>
                                        <span
                                            className='font-medium text-xs text-slate-600'
                                        >{video.author} - {video.lengthSeconds} seconds</span>
                                    </div>


                                </div>

                            </div>
                        ))
                        }

                    </div>
                </div>
            </div>

        </main>
    )
}
