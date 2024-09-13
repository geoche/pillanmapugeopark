import Separator from "@components/Separator";

const Documentary = ({dict}) => {
    return (
        <div className={`flex items-center justify-center bg-default py-12`}>
            <div className="text-center w-full">
                <h2 className="text-h-secondary">{dict.geopark.documentary.title}</h2>
                <Separator/>
                <div className="max-w-2xl aspect-video mx-auto p-4">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube-nocookie.com/embed/VEXeD46jHnA?si=rs7clQB1lP3L4nYi"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Documentary;
