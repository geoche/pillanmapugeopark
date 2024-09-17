import PhotoGallery from "@components/gallery/image-gallery/PhotoGallery";
import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";

const Photos = async ({params}) => {
    const dict = await getDictionary(params.lang);
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={dict.geopark.gallery.imageGallery.header}/>
            <PhotoGallery/>
        </section>);
};

export default Photos;
