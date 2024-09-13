import Provider from "@components/Provider";
import Navbar from "@components/navbar/Navbar";
import Footer from "@components/footer/Footer";
import "@styles/globals.css";

import {getDictionary} from "@app/[lang]/dictionaries";


export const metadata = {
    title: "Geopark",
    description: "Geopark website",
};

export async function generateStaticParams() {
    return [{lang: 'en'}, {lang: 'es'}];
}


const RootLayout = async ({children, params}) => {
    const selectedLang = params.lang;
    const dict = await getDictionary(selectedLang);
    return (
        <html lang={selectedLang}>
        <Provider>
            <body>
            <Navbar lang={selectedLang} dict={dict}/>
            <main>
                {children}
            </main>
            <Footer lang={selectedLang} dict={dict}/>
            </body>
        </Provider>
        </html>
    );
};

export default RootLayout;