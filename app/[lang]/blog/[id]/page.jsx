"use client"
import {useState, useEffect} from 'react';
import Image from "next/image";
import Spinner from "@components/Spinner";
import HeaderOpacity from "@components/HeaderOpacity";
import Separator from "@components/Separator";
import BlogPostSection from "@components/blog/BlogPostSection";

const BlogPostPage = async ({params}) => {
    const [blogPost, setBlogPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const currentLanguage = params.lang;
    const locale = currentLanguage === 'en' ? 'default' : 'es-ES';
    
    const blogpostBy = currentLanguage === 'en' ? 'By' : 'Por';


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
                        className={`w-full transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'} overflow-x-hidden`}>
                        <HeaderOpacity/>
                        <div className={`w-screen overflow-x-hidden flex flex-col flex-center bg-default p-4`}>
                            <div className={`max-w-7xl`}>
                                <h3 className={`text-h-secondary italic`}>{blogPost.title}</h3>
                                <Image
                                    src={blogPost.mainImgSrc}
                                    alt={`mainImg-${params.id}`}
                                    className={`w-full`}
                                    width={1280}
                                    height={720}/>
                                <div className={`w-full flex flex-col flex-center p-4 space-y-2`}>
                                    <p className={`text-black w-full max-w-2xl text-justify italic`}>{blogPost.description}</p>
                                    <p className={`text-black w-full max-w-2xl italic text-sm`}>{`${blogpostBy} ${blogPost.blogpostBy}`}</p>
                                    <p className={`text-black w-full max-w-2xl italic text-sm`}>{new Date(blogPost.createdAt).toLocaleDateString(locale, {month: 'long', day: 'numeric', year:'numeric'})}</p>
                                </div>
                                <div className={`py-12`}>
                                    <Separator/>
                                </div>
                            </div>
                            <div>
                                {blogPost.blogNode.map((node, index) => (
                                    <BlogPostSection blogPostSection={node} index={index} lang={params.lang}/>
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
