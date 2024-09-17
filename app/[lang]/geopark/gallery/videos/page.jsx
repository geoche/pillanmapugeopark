import VideoGallery from "@components/gallery/video-gallery/VideoGallery";
import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";

const Videos = async ({params}) => {
    const dict = await getDictionary(params.lang);

    return (
        <section className={`component-section`}>
            <HeaderOpacity title={dict.geopark.gallery.videoGallery.header}/>
            <VideoGallery/>
        </section>);
};

export default Videos;
