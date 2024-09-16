"use client"
import {useState, useEffect} from 'react';
import Spinner from "@components/Spinner";
import BlogGridItem from "@components/blog/BlogGridItem";

const BlogGrid = ({lang}) => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const fetchBlogposts = async () => {
            try {
                const res = await fetch('/api/blog');
                if (!res.ok) {
                    console.error('Failed to fetch data');
                    return;
                }
                const data = await res.json();
                setBlogPosts(data);
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 300);
            }
        };

        fetchBlogposts().then(() => {
        });
    }, []);
    
    return (
        <div className={`w-full ${loading ? `h-[32rem]` : null} bg-default py-12`}>
            {loading ?
                <div className={`w-full py-24 flex flex-center`}>
                    <Spinner/>
                </div>
                : (
                    <div
                        className={`w-full flex flex-wrap flex-center items-center max-w-7xl p-4 mx-auto transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                        {blogPosts.map((post, index) => (
                            <BlogGridItem key={index} post={post} index={index} lang={lang}/>
                        ))}
                    </div>
                )}
        </div>
    );
};

export default BlogGrid;
