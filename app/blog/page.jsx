import PageUnderConstruction from "@components/PageUnderConstruction";

const Blog = () => {
    return (
        <section
            className="relative flex-col bg-cover bg-fixed bg-center bg-no-repeat"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <PageUnderConstruction/>
        </section>
    );
};

export default Blog;
