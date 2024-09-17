import BlogGrid from "@components/blog/BlogGrid";
import HeaderOpacity from "@components/HeaderOpacity";

const Blog = async ({params}) => {
    const currentLanguage = params.lang;
    return (
        <section className={`component-section`}>
            <HeaderOpacity/>
            <BlogGrid lang={currentLanguage}/>
        </section>
    );
};

export default Blog;
