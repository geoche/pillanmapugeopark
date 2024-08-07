import "@styles/globals.css";
import Provider from "@components/Provider";

export const metadata = {
    title: "Geopark",
    description: "Geopark website",
};

const RootLayout = ({children}) => {
    return (
        <html lang="en">
        <Provider>
            <body>
            <div className="main h-screen bg-default"/>

            <main className="app">
                {children}
            </main>
            </body>
        </Provider>
        </html>
    );
};

export default RootLayout;
