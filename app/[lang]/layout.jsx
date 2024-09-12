import Provider from "@components/Provider";
import Navbar from "@components/navbar/Navbar";

import "@styles/globals.css";
import Footer from "@components/Footer";

export const metadata = {
    title: "Geopark",
    description: "Geopark website",
};

export async function generateStaticParams() {
    return [{lang: 'en'}, {lang: 'es'}];
}


const RootLayout = ({children, params}) => {
    console.log(params.lang);
    return (
        <html lang={params}>
        <Provider>
            <body>
            <Navbar lang={params.lang}/>
            <main>
                {children}
            </main>
            <Footer lang={params.lang}/>
            </body>
        </Provider>
        </html>
    );
};

export default RootLayout;
