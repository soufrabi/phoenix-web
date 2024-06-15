

type VideoThumbnail = {
    quality: string,
    url: string,
    width: number,
    height: number,
}

export function getVideoThumbnailUrl(videoThumbnails: Array<VideoThumbnail>) {
    const mediumQuality = videoThumbnails.find((el) => el.quality === 'medium')
    if (typeof mediumQuality !== 'undefined') {
        return mediumQuality.url
    }

    return videoThumbnails[videoThumbnails.length - 1].url

}


