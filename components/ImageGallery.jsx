import 'photoswipe/dist/photoswipe.css';
import {Gallery, Item} from 'react-photoswipe-gallery';
import Image from 'next/image';

const ImageGallery = ({images}) => {
    return (
        <div className="relative flex items-center max-w-screen-xl mx-auto py-4">
            <Gallery withCaption>
                <div className="flex flex-wrap justify-center items-center">
                    {images.map((image, index) => (
                        <Item
                            key={index}
                            original={image.imageSrc}
                            thumbnail={image.imageSrc}
                            width="1080"
                            height="720"
                            alt={`image`}
                            caption={`<h1 class="text-lg md:text-2xl text-center pb-10">${image.caption}</h1>`}
                        >
                            {({ref, open}) => (
                                <div ref={ref} onClick={open}>
                                    <Image
                                        src={image.imageSrc}
                                        alt={`image`}
                                        width={369}
                                        height={247}
                                        className={`aspect-video object-cover m-2`}
                                    />
                                </div>
                            )}
                        </Item>
                    ))}
                </div>
            </Gallery>
        </div>

    );
};

export default ImageGallery;