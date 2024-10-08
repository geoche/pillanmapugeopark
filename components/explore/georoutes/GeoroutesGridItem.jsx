import Link from "next/link";
import Image from "next/image";

const GeoroutesGridItem = ({lang, item, index}) => {
    return (
        <div key={index} className={`p-2 w-full sm:w-1/2 lg:w-1/3 relative`}>
            <Link className={`w-full`} href={`/${lang}/explore/georoutes/${item.id}`}>
                <div>
                    <Image
                        src={item.mainImgSrc}
                        alt={`grt-img-${index}`}
                        priority
                        width={800}
                        height={600}
                        className={`rounded-2xl aspect-video object-cover`}
                    />
                </div>
                <div
                    className="absolute bottom-2 left-0 right-0 text-white py-4 px-2 rounded-tl-2xl rounded text-center">
                    <p>{item.title}</p>
                </div>
            </Link>
        </div>
    );
};

export default GeoroutesGridItem;
