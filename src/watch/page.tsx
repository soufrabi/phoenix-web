import React from 'react';
import { useSearchParams } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios';
import { nanoid } from 'nanoid';
import { currentInvidiousInstance } from '../data/invidious';
import { Interweave } from 'interweave';

type InvidiousVideosResponseRecommendedVideo = {
    "videoId": string,
    "title": string,
    "videoThumbnails": [
        {
            "quality": string,
            "url": string,
            "width": number,
            "height": number
        }
    ],
    "author": string,
    "lengthSeconds": number,
    "viewCountText": string
}


type InvidiousVideosResponse = {
    "type": string, // "video"|"published"
    "title": string,
    "videoId": string,
    "videoThumbnails": [
        {
            "quality": string,
            "url": string,
            "width": number,
            "height": number
        }
    ],
    "storyboards": [
        {
            "url": string,
            "templateUrl": string,
            "width": number,
            "height": number,
            "count": number,
            "interval ": number,
            "storyboardWidth": number,
            "storyboardHeight": number,
            "storyboardCount": number
        }
    ],

    "description": string,
    "descriptionHtml": string,
    "published": number,
    "publishedText": string,

    "keywords": Array<string>,
    "viewCount": number,
    "likeCount": number,
    "dislikeCount": number,

    "paid": boolean,
    "premium": boolean,
    "isFamilyFriendly": boolean,
    "allowedRegions": Array<string>,
    "genre": string,
    "genreUrl": string,

    "author": string,
    "authorId": string,
    "authorUrl": string,
    "authorThumbnails": [
        {
            "url": string,
            "width": number,
            "height": number
        }
    ],

    "subCountText": string,
    "lengthSeconds": number,
    "allowRatings": boolean,
    "rating": number,
    "isListed": boolean,
    "liveNow": boolean,
    "isPostLiveDvr": boolean,
    "isUpcoming": boolean,
    "dashUrl": string,
    "premiereTimestamp": number | null,

    "hlsUrl": string | null,
    "adaptiveFormats": [
        {
            "index": string,
            "bitrate": string,
            "init": string,
            "url": string,
            "itag": string,
            "type": string,
            "clen": string,
            "lmt": string,
            "projectionType": number,
            "container": string,
            "encoding": string,
            "qualityLabel": string | null,
            "resolution": string | null
        }
    ],
    "formatStreams": [
        {
            "url": string,
            "itag": string,
            "type": string,
            "quality": string,
            "container": string,
            "encoding": string,
            "qualityLabel": string,
            "resolution": string,
            "size": string
        }
    ],
    "captions": [
        {
            "label": string,
            "languageCode": string,
            "url": string
        }
    ],
    "recommendedVideos": Array<InvidiousVideosResponseRecommendedVideo>
}

export default function WatchPage() {
    // const router = useRouter()
    const defaultYoutubeVideoId = "zgQ0cyNJZV4"
    const [searchParams, setSearchParams] = useSearchParams()
    const videoId: string | null = React.useMemo(() => (
        searchParams.get('v') || defaultYoutubeVideoId
    ), [searchParams])
    const [videoUrl, setVideoUrl] = React.useState<string>("")
    const [videoThumbnailUrl, setVideoThumbnailUrl] = React.useState<string>("")
    const [videoInfo, setVideoInfo] = React.useState<InvidiousVideosResponse | null>(null)
    const [recommendedVideos, setRecommendedVideos] = React.useState<Array<InvidiousVideosResponseRecommendedVideo>>([])

    const openRecommendedVideo = (id: string) => {
        // console.log(`Open Recommended Video : video id ${id}`)
        // router.replace(`/watch?v=${id}`)
        setSearchParams({
            type: "watch",
            v: id
        })
    }

    const fetchVideoInfo = async () => {

        if (videoId) {
            try {
                const res: AxiosResponse = await axios.get(`https://${currentInvidiousInstance}/api/v1/videos/${videoId}`)
                const data: InvidiousVideosResponse = res.data
                // console.log("Data : ", data)
                // const description = data.description
                const formatStreams = data.formatStreams
                const videoStreams: Array<any> = []

                formatStreams.map((stream: any) => {
                    if (stream.type.substring(0, 9) === "video/mp4") {
                        videoStreams.push(stream)
                    }
                })

                // const chosenVideoStream = videoStreams[videoStreams.length - 1].url
                const chosenVideoStream = videoStreams[0].url
                // console.log("Chosen Video Stream  : ", chosenVideoStream)
                setVideoThumbnailUrl(data.videoThumbnails[0].url)
                setVideoUrl(chosenVideoStream)
                setRecommendedVideos(data.recommendedVideos)
                setVideoInfo(data)
                // console.log(data.descriptionHtml)
            } catch (err) {
                console.error("Could not get video data from invidious instance")
            }

        }


    }

    React.useEffect(() => {
        fetchVideoInfo()
    }, [videoId])

    // video is not expanding as much because of grid layout constraints
    // const youtubeVideoScale = 70
    return (
        <main className="h-full w-screen pt-12">
            <div className='px-24'>
                <div className="grid grid-cols-12  gap-4 pt-4 px-2">
                    <div className='col-span-8 mx-auto'>
                        <div className='flex justify-start'>
                            <video
                                src={videoUrl}
                                poster={videoThumbnailUrl}
                                // width={16 * youtubeVideoScale}
                                // height={9 * youtubeVideoScale}
                                width={"100%"}
                                autoPlay={true}
                                controls={true}
                                // muted={true}
                                loop={false}
                                className={"place-self-center rounded-2xl aspect-video object-cover"}
                            >
                                <p>
                                    Your browser does not support HTML video
                                </p>

                            </video>
                        </div>
                        {/* video description */}
                        {videoInfo !== null &&
                            <div id='video-description' className='p-2 flex flex-col'>
                                <div>
                                    <span className='font-semibold text-lg'
                                    >{videoInfo.title}</span>
                                </div>
                                <div>
                                    <div className='flex flex-row gap-2'>
                                        <img
                                            src={videoInfo.authorThumbnails[0].url}
                                            width={30}
                                            height={30}
                                        />
                                        <div className='flex flex-col gap-0'>
                                            <span
                                                className='text-md font-medium'
                                            >{videoInfo.author}</span>
                                            <span
                                                className='text-sm'
                                            >{videoInfo.subCountText}</span>
                                        </div>

                                    </div>
                                </div>
                                <div
                                    className="p-2"
                                >
                                    <Interweave
                                        content={videoInfo.descriptionHtml}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                    <div className='col-span-4 flex flex-col justify-center gap-2'>
                        {recommendedVideos.map((recommendedVideo) => (
                            <div key={nanoid()} className='flex flex-row gap-2'>
                                <img
                                    src={recommendedVideo.videoThumbnails[0].url}
                                    alt={""}
                                    width={16 * 15}
                                    height={9 * 15}
                                    className='rounded-2xl select-none'
                                    onContextMenu={(ev: React.MouseEvent<HTMLImageElement>) => { ev.preventDefault() }}
                                    onClick={() => { openRecommendedVideo(recommendedVideo.videoId) }}
                                />
                                <div className='flex flex-col'>
                                    <span
                                        className='select-none'
                                    >{recommendedVideo.title}</span>
                                    <span
                                        className='text-sm select-none'
                                    >{recommendedVideo.author}</span>
                                    <span
                                        className='text-sm select-none'
                                    >{recommendedVideo.viewCountText}</span>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )

}
