import Link from "next/link";
import Image from "next/image";

const BlogGridItem = ({lang, post, index}) => {
    const locale = lang === 'en' ? 'default' : 'es-ES';

    return (
        <div key={index} className={`p-2 w-full ${index === 0 ? null : 'sm:w-1/2 lg:w-1/3'} relative`}>
            <Link className={`w-full`} href={`/${lang}/blog/${post._id}`}>
                <div>
                    <Image
                        src={post.mainImgSrc}
                        alt={`blog-${index}`}
                        priority
                        width={1280}
                        height={720}
                        className={`aspect-video rounded-t-2xl object-cover`}
                    />
                </div>
                <div
                    className="bottom-2 left-0 right-0 p-4 rounded-b-2xl shadow-xl">
                    <p className={`text-lg`}>{post.title}</p>
                    <p className={`text-sm`}>{new Date(post.createdAt).toLocaleString(locale, {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}</p>
                </div>
            </Link>
        </div>
    );
};

export default BlogGridItem;
