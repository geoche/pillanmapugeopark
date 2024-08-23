"use client"
import {useState, useEffect} from 'react';
import Image from "next/image";
import Spinner from "@components/Spinner";
import HeaderOpacity from "@components/HeaderOpacity";
import Separator from "@components/Separator";

const BlogPostPage = ({params}) => {
    const [blogPost, setBlogPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const fetchBlogpostById = async () => {
            try {
                const res = await fetch(`/api/blog/${params.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    console.log('Failed to fetch blogpost details');
                }

                const data = await res.json();
                setBlogPost(data);
            } catch (error) {
                console.error('Error fetching accommodation details:', error);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 300);
            }
        };

        fetchBlogpostById().then(() => {
        });
    }, []);


    return (
        <section className={`component-section`}>
            {loading ? (
                <div className={`w-full h-screen overflow-x-hidden flex flex-center bg-default-opacity`}>
                    <Spinner/>
                </div>
            ) : (showContent && blogPost ? (
                    <div
                        className={`w-full transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                        <HeaderOpacity title={blogPost.title}/>
                        <div className={`w-screen overflow-x-hidden flex flex-col flex-center bg-default p-4 xl:py-12`}>
                            <div className={`max-w-7xl`}>
                                <Image
                                    src={blogPost.mainImgSrc}
                                    alt={`mainImg-${params.id}`}
                                    className={`w-full`}
                                    width={1280}
                                    height={720}/>
                                <div className={`w-full flex flex-col flex-center p-4 space-y-2`}>
                                    <p className={`text-black w-full max-w-2xl text-justify italic`}>{blogPost.description}</p>
                                    <p className={`text-black w-full max-w-2xl italic text-sm`}>{`By ${blogPost.blogpostBy}`}</p>
                                    <p className={`text-black w-full max-w-2xl italic text-sm`}>{new Date(blogPost.createdAt).toLocaleDateString('default', {month: 'long', day: 'numeric', year:'numeric'})}</p>
                                </div>
                                <div className={`py-12`}>
                                    <Separator/>
                                </div>
                            </div>
                            <div>
                                {blogPost.blogNode.map((node, index) => (
                                    <div key={index} className={`max-w-7xl py-8`}>
                                        {node.nodeImage.nodeImageSrc && (
                                            <>
                                                <Image
                                                    src={node.nodeImage.nodeImageSrc}
                                                    alt={`nodeImg-${index}`}
                                                    className="w-full max-w-4xl"
                                                    width={1280}
                                                    height={720}
                                                />
                                                <div className="w-full flex flex-col flex-center py-2 px-4">
                                                    <p className="text-black w-full max-w-4xl text-justify italic text-xs">
                                                        {node.nodeImage.nodeImageDescription}
                                                    </p>
                                                    <p className="text-black w-full max-w-4xl italic text-xs">
                                                        {`Photography by ${node.nodeImage.nodeImageBy}`}
                                                    </p>
                                                </div>
                                                {node.text && (
                                                    <>
                                                        <div className="w-full flex flex-col flex-center px-0 xl:px-4 py-8">
                                                            <p className="text-black w-full max-w-2xl text-justify ">
                                                                {node.text}
                                                            </p>
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                ) : (<div> Blogpost not found</div>)
            )}
        </section>
    );
};

export default BlogPostPage;
