import React from 'react'

const VideoPlayer = ({videoUrl}) => {
  return (
    <div>
      <iframe src={videoUrl} width={640} height={220} frameBorder={0} allowFullScreen></iframe>
    </div>
  )
}

export default VideoPlayer
