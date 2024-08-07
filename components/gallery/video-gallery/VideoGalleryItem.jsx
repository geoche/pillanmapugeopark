

import {getYoutubeVideoId} from "@components/gallery/video-gallery/YoutubeUrlHelper";
const VideoGalleryItem = ({videoUrl, description = {}}) => {
    
    return (
        <div className={` p-4 text-white text-justify lg:w-1/2 xl:w-1/3`}>
            <iframe src={getYoutubeVideoId(videoUrl)}
                    className="aspect-video w-full h-full rounded-2xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen ></iframe>
            <p className={`text-sm py-4 h-auto lg:min-h-48 xl:min-h-52`}>{description}</p>
        </div>
    );
};

export default VideoGalleryItem;
