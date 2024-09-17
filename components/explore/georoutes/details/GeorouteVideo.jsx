import Separator from "@components/Separator";

const GeorouteVideo = ({videoId, place, dict}) => {
    return (
        <div className={`flex items-center justify-center bg-default w-full`}>
            <div className="text-center w-full">
                <h3 className="text-h-secondary">{`${dict.exploreGeopark.georoutes.videoOf} ${place}`}</h3>
                <Separator/>
                <div className="max-w-2xl aspect-video mx-auto p-4">
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default GeorouteVideo;
