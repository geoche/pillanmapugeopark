import Link from "next/link";
import Image from "next/image";

const ExperiencesGridItem = ({expItem, index}) => {
    return (
        <div key={index} className={`p-2 w-full sm:w-1/2 lg:w-1/3 relative`}>
            <Link className={`w-full`} href={`/visit-us/experiences/${expItem._id}`}>
                <div>
                    <Image
                        src={expItem.mainImgSrc}
                        alt={`experiences-${index}`}
                        priority
                        width={800}
                        height={600}
                        className={`rounded-2xl aspect-video object-cover`}
                    />
                </div>
                <div
                    className="absolute bottom-2 left-0 right-0 text-white py-4 px-2 rounded-tl-2xl rounded text-center">
                    <p>{expItem.title}</p>
                </div>
            </Link>
        </div>
    );
};

export default ExperiencesGridItem;
