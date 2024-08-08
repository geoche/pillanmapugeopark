import React from 'react';
import Navbar from "@components/navbar/Navbar";
import RoundedSeparator from "@components/RoundedSeparator";
import Footer from "@components/Footer";
import PageUnderConstruction from "@components/PageUnderConstruction";

const Blog = () => {
    return (
        <section
            className="relative h-screen w-screen overflow-x-hidden flex-col overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <Navbar/>
            <PageUnderConstruction/>
            <Footer classNameExternal={"relative w-full"}/>
        </section>
    );
};

export default Blog;
