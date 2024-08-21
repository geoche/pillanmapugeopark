import {geoparkLinks} from "@components/navbar/navbarLinks/geoparkLinks";
import {exploreGeoparkLinks} from "@components/navbar/navbarLinks/exploreGeoparkLinks";
import {interactiveMapLinks} from "@components/navbar/navbarLinks/iteractiveMapLinks";
import {visitUsLinks} from "@components/navbar/navbarLinks/visitUsLinks";
import {blogLinks} from "@components/navbar/navbarLinks/blogLinks";

export const navbarLinks = [
    { title: "The Geopark", links: geoparkLinks },
    { title: "Explore the Geopark", links: exploreGeoparkLinks },
    { title: "Interactive Map", links: interactiveMapLinks },
    { title: "Visit Us", links: visitUsLinks },
    { title: "Blog", links: blogLinks },
];