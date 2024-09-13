import {exploreGeopark} from "@components/footer/exploreGeopark";
import {geoparkInfo} from "@components/footer/geoparkInfo";
import {other} from "@components/footer/other";

export const footerLinks = [
    {title: "The Geopark", links: geoparkInfo},
    {title: "Explore The Geopark", links: exploreGeopark},
    {title: "Other", links: other}
]