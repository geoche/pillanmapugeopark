import Separator from "@components/Separator";

const TerritoryDocumentary = ({dict}) => {
    return (
        <div className={`flex items-center justify-center bg-default py-12`}>
            <div className="text-center w-full">
                <h2 className="text-h-secondary">TERRITORY DOCUMENTARY</h2>
                <Separator/>
                <div className="max-w-2xl aspect-video mx-auto p-4">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/AxtHTB5ze30?si=oIT21gudGSlhuII9"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default TerritoryDocumentary;
