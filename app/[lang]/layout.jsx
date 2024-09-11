import Provider from "@components/Provider";
import Navbar from "@components/navbar/Navbar";

import "@styles/globals.css";
import Footer from "@components/Footer";

export const metadata = {
    title: "Geopark",
    description: "Geopark website",
};


const RootLayout = ({children, lang}) => {
    console.log('Language:', lang); // Added console log

    return (
        <html lang={lang}>
        
        <Provider>
            <body>
            <Navbar/>
            <main>
                {children}
            </main>
            <Footer/>
            </body>
        </Provider>
        </html>
    );
};

export default RootLayout;
