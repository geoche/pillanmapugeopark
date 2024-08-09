import React from 'react';

const Header = ({headerText}) => {
    return (
        <div className={`mx-auto bg-default-opacity w-full h-56 flex flex-center`}>
            <h1 className={`text-white text-3xl`}>{headerText}</h1>
        </div>
    );
};

export default Header;
