import Provider from "@components/Provider";
import Navbar from "@components/navbar/Navbar";

import "@styles/globals.css";
import Footer from "@components/Footer";

export const metadata = {
    title: "Geopark",
    description: "Geopark website",
};

const RootLayout = ({children}) => {
    return (
        <html lang="en">
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
