import BlogGrid from "@components/blog/BlogGrid";
import HeaderOpacity from "@components/HeaderOpacity";

const Blog = () => {
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Blog`}/>
            <BlogGrid/>
        </section>
    );
};

export default Blog;
