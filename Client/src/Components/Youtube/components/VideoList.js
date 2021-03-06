import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({videos , handleVideoSelect ,videoplaying}) => {
    // console.log(videos);

    const renderedVideos = videos.map((video) => {
        return <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />
    });

    return <div className='ui relaxed divided list' style={{display:videoplaying?"none":"block"}}>{renderedVideos}</div>;
};
export default VideoList;