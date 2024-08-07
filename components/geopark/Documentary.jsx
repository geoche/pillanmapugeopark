import Separator from "@components/Separator";

const Documentary = () => {
    return (
        <div className={`flex items-center justify-center bg-default py-12`}>
            <div className="text-center text-white w-screen">
                <h2 className="text-3xl font-bold mb-8 md:mb-10">PILLANMAPU DOCUMENTARY</h2>
                <Separator bgColor={"bg-white"}/>
                <div className="max-w-2xl h-56 md:h-96 md:mx-auto px-3 my-12">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube-nocookie.com/embed/VEXeD46jHnA?si=rs7clQB1lP3L4nYi"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <Separator bgColor={"bg-white"}/>
            </div>
        </div>
    );
};

export default Documentary;
