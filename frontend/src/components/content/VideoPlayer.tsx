'use client'
import 'vidstack/styles/community-skin/video.css'
import 'vidstack/styles/defaults.css'

import type { MediaPlayerProps } from '@vidstack/react'
import {
  MediaCommunitySkin,
  MediaOutlet,
  MediaPlayer,
  MediaPoster,
} from '@vidstack/react'

interface VideoPlayerProps extends MediaPlayerProps {
  alt?: string
}

const VideoPlayer = (props: VideoPlayerProps) => {
  const { src, poster, thumbnails, title, alt } = props

  return (
    <MediaPlayer
      title={title}
      src={src}
      poster={poster}
      thumbnails={thumbnails}
      aspectRatio={16 / 9}
    >
      <MediaOutlet>
        <MediaPoster alt={alt} />
      </MediaOutlet>
      <MediaCommunitySkin />
    </MediaPlayer>
  )
}
export default VideoPlayer
