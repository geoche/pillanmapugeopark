import React from 'react';
import Link from "next/link";

const FooterColumns = ({lang, links = {}}) => {
    return (
        <>
            {links.map((column, index) => (
                <div key={index}>
                    <ul className="mt-2 space-y-2">
                        {column.links.map((info, index) => (
                            <li key={index}>
                                <Link href={`/${lang}${info.link}`}>{info.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
};

export default FooterColumns;
